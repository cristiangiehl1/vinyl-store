import { getDBConnection } from './db/db.js'

const tables = ['users', 'products', 'cart_items']

async function logTable() {
  const tableName = process.argv[2]

  if (!tableName) {
    console.log('Você precisa informar o nome da tabela.')
    console.log('Opções disponíveis:')
    tables.forEach((t) => console.log(`- ${t}`))
    process.exit(1)
  }

  if (!tables.includes(tableName)) {
    console.log(`Tabela inválida: "${tableName}"`)
    console.log('Opções disponíveis:')
    tables.forEach((t) => console.log(`- ${t}`))
    process.exit(1)
  }

  const db = await getDBConnection()

  try {
    const table = await db.all(`SELECT * FROM ${tableName}`)
    console.table(table)
  } catch (err) {
    console.error('Error fetching table:', err.message)
  } finally {
    await db.close()
  }
}

logTable()
