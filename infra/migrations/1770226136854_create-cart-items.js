export async function up(pgm) {
  pgm.createTable(
    'cart_items',
    {
      id: 'id',
      user_id: {
        type: 'integer',
        notNull: true,
        references: 'users(id)',
        onDelete: 'cascade',
      },
      product_id: {
        type: 'integer',
        notNull: true,
        references: 'products(id)',
        onDelete: 'cascade',
      },
      quantity: {
        type: 'integer',
        notNull: true,
        default: 1,
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
  pgm.dropTable('cart_items', { ifExists: true })
}
