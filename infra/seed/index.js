import 'dotenv/config'

import { vinyl } from '../../data.js'
import { getNewClient } from '../database.js'

async function seedTable() {
  const client = await getNewClient()

  try {
    await client.query('BEGIN')

    for (const item of vinyl) {
      const { title, artist, price, image, year, genre, stock } = item

      await client.query(
        `
        INSERT INTO products (
          title,
          artist,
          price,
          image,
          year,
          genre,
          stock
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,
        [title, artist, price, image, year, genre, stock]
      )
    }

    await client.query('COMMIT')
    console.log('All records inserted successfully.')
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('Error inserting data:', err.message)
  } finally {
    await client.end()
    console.log('Database connection closed.')
  }
}

seedTable()
