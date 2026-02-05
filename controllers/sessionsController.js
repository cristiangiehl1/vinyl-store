import crypto from 'node:crypto'

import bcrypt from 'bcryptjs'

import { query } from '../infra/database.js'
import { controller } from './controller.js'

export const EXPIRATION_IN_MILLISECONDS = 60 * 60 * 24 * 30 * 1000 // 30 days

export async function createSession(req, res) {
  let { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  username = username.trim()

  try {
    const result = await query({
      text: `
      SELECT id, password
      FROM users
      WHERE username = $1
      `,
      values: [username],
    })

    const user = result.rows[0]

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = crypto.randomBytes(48).toString('hex')
    const expiresAt = getExpirationDate()

    await query({
      text: `
      INSERT INTO 
        sessions 
          (user_id, token, expires_at) 
        VALUES 
          ($1, $2, $3)
        RETURNING
          *
      ;`,
      values: [user.id, token, expiresAt],
    })

    controller.setSessionCookie({ res, token })

    res.status(201).json({ message: 'Logged in' })
  } catch (err) {
    console.error('Login error:', err.message)
    res.status(500).json({ error: 'Login failed. Please try again.' })
  }
}

export async function deleteSession(req, res) {
  const sessionToken = req.cookies.sessionId

  if (!sessionToken) {
    return res.status(401).json({ error: 'User without active session' })
  }

  const sessionResult = await query({
    text: `
        SELECT 
          * 
        FROM
          sessions
        WHERE
          token = $1
          AND
          expires_at > NOW()
        LIMIT
          1
      `,
    values: [sessionToken],
  })

  if (sessionResult.rows.length === 0) {
    return res.status(401).json({ error: 'User without active session' })
  }

  const storedSession = sessionResult.rows[0]

  await query({
    text: `
        UPDATE
          sessions
        SET
          expires_at = expires_at - interval '1 year',
          updated_at = NOW()
        WHERE
          id = $1
        RETURNING
          *
      `,
    values: [storedSession.id],
  })

  controller.clearSessionCookie(res)

  res.json({ message: 'Logged out' })
}

export function getExpirationDate() {
  return new Date(Date.now() + EXPIRATION_IN_MILLISECONDS)
}
