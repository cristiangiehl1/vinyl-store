import database from '../infra/database.js'

export async function getGenres(req, res) {
  try {
    const result = await database.query(
      `
      SELECT DISTINCT genre
      FROM products
      WHERE genre IS NOT NULL
      `
    )

    const genres = result.rows.map((row) => row.genre)
    res.json(genres)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to fetch genres', details: err.message })
  }
}

export async function getProducts(req, res) {
  try {
    let text = 'SELECT * FROM products'
    let values = []

    const { genre, search } = req.query

    if (genre) {
      text += ' WHERE genre = $1'
      values.push(genre)
    } else if (search) {
      text += `
        WHERE
          title  ILIKE $1 OR
          artist ILIKE $2 OR
          genre  ILIKE $3
      `
      const searchPattern = `%${search}%`
      values.push(searchPattern, searchPattern, searchPattern)
    }

    const result = await database.query({ text, values })

    res.json(result.rows)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to fetch products', details: err.message })
  }
}
