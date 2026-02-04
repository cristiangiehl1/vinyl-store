import database from '../infra/database.js'

export async function getCurrentUser(req, res) {
  const userId = req.session.userId

  try {
    if (!userId) {
      return res.json({ isLoggedIn: false })
    }

    const result = await database.query({
      text: 'SELECT name FROM users WHERE id = $1',
      values: [userId],
    })

    res.json({ isLoggedIn: true, name: result.rows[0].name })
  } catch (err) {
    console.error('getCurrentUser error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}
