export async function up(pgm) {
  pgm.createTable(
    'sessions',
    {
      id: 'id',
      token: {
        type: 'varchar(96)',
        notNull: true,
        unique: true,
      },
      user_id: {
        type: 'integer',
        notNull: true,
        references: 'users(id)',
        onDelete: 'cascade',
      },
      expires_at: {
        type: 'timestamptz',
        notNull: true,
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
  pgm.dropTable('sessions', { ifExists: true })
}
