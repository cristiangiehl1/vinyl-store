import { query } from '../infra/database.js'

export async function getCurrentUser(req, res) {
  const sessionToken = req.cookies.sessionId

  try {
    if (!sessionToken) {
      return res.json({ isLoggedIn: false })
    }

    const result = await query({
      text: 'SELECT U.name FROM sessions S LEFT JOIN users U ON u.id = S.user_id WHERE S.token = $1',
      values: [sessionToken],
    })

    res.json({ isLoggedIn: true, name: result.rows[0].name })
  } catch (err) {
    console.error('getCurrentUser error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}
