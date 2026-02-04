import 'dotenv/config'

import { Client } from 'pg'

export async function query(queryObj) {
  let client
  try {
    client = await getNewClient()

    return await client.query(queryObj)
  } catch (err) {
    throw new Error('Error to connect with Database or Query', { cause: err })
  } finally {
    if (client) {
      await client.end()
    }
  }
}

export async function getNewClient() {
  const DATABASE_URL = process.env.DATABASE_URL

  if (!DATABASE_URL) {
    throw new Error('POSTGRES_PORT is not defined in environment variables')
  }

  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: getSSLValues(),
  })

  await client.connect()
  return client
}

function getSSLValues() {
  if (process.env.POSTGRES_CA) return { ca: process.env.POSTGRES_CA }

  return process.env.NODE_ENV === 'production' ? true : false
}
