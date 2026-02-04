import path from 'node:path'

import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

export async function getDBConnection() {
  const dbPath = path.join('db', 'database.db')

  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  })
}
