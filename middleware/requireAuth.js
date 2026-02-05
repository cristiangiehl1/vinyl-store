import { controller } from '../controllers/controller.js'
import { query } from '../infra/database.js'

export async function requireAuth(req, res, next) {
  const sessionToken = req.cookies.sessionId

  if (!sessionToken) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const sessionResult = await query({
      text: `
        SELECT u.id
        FROM sessions s
        JOIN users u ON u.id = s.user_id
        WHERE s.token = $1 AND expires_at > NOW()
        LIMIT 1
      `,
      values: [sessionToken],
    })

    if (sessionResult.rowCount === 0) {
      controller.clearSessionCookie(res)
      return res.status(401).json({ error: 'Unauthorized' })
    }

    req.userId = sessionResult.rows[0].id

    next()
  } catch (err) {
    console.error('Auth middleware error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
