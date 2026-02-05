import crypto from 'node:crypto'

import bcrypt from 'bcryptjs'
import validator from 'validator'

import { query } from '../infra/database.js'
import { controller } from './controller.js'
import { getExpirationDate } from './sessionsController.js'

export async function registerUser(req, res) {
  let { name, email, username, password } = req.body

  if (!name || !email || !username || !password) {
    return res.status(400).json({ error: 'All fields are required.' })
  }

  name = name.trim()
  email = email.trim()
  username = username.trim()

  if (!/^[a-zA-Z0-9_-]{1,20}$/.test(username)) {
    return res.status(400).json({
      error:
        'Username must be 1–20 characters, using letters, numbers, _ or -.',
    })
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' })
  }

  try {
    const existing = await query({
      text: `
      SELECT id
      FROM users
      WHERE email = $1 OR username = $2
      `,
      values: [email, username],
    })

    if (existing.rows.length > 0) {
      return res
        .status(400)
        .json({ error: 'Email or username already in use.' })
    }

    const hashed = await bcrypt.hash(password, 10)

    const userResult = await query({
      text: `
      INSERT INTO users (name, email, username, password)
      VALUES ($1, $2, $3, $4)
      RETURNING id
      `,
      values: [name, email, username, hashed],
    })

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
      values: [userResult.rows[0].id, token, expiresAt],
    })

    controller.setSessionCookie({ res, token })

    res.status(201).json({ message: 'User registered' })
  } catch (err) {
    console.error('Registration error:', err.message)
    res.status(500).json({ error: 'Registration failed. Please try again.' })
  }
}
