export async function up(pgm) {
  pgm.createTable(
    'products',
    {
      id: 'id',
      title: {
        type: 'varchar',
        notNull: true,
      },
      artist: {
        type: 'varchar(30)',
        notNull: true,
      },
      genre: {
        type: 'varchar',
      },
      image: {
        type: 'varchar',
        notNull: true,
      },
      year: {
        type: 'integer',
      },
      price: {
        type: 'real',
        notNull: true,
      },
      stock: {
        type: 'integer',
      },
      created_at: {
        type: 'timestamptz',
        default: pgm.func("timezone('utc', now())"),
        notNull: true,
      },
      updated_at: {
        type: 'timestamptz',
        default: pgm.func("timezone('utc', now())"),
        notNull: true,
      },
    },
    { ifNotExists: true }
  )
}

export async function down(pgm) {
  pgm.dropTable('products', { ifExists: true })
}
