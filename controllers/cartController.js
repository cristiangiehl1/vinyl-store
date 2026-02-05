import { query } from '../infra/database.js'

export async function addToCart(req, res) {
  const productId = parseInt(req.body.productId, 10)

  if (isNaN(productId)) {
    return res.status(400).json({ error: 'Invalid product ID' })
  }

  const userId = req.userId

  const existing = await query({
    text: `
      SELECT id, quantity
      FROM cart_items
      WHERE user_id = $1 AND product_id = $2
      `,
    values: [userId, productId],
  })

  if (existing.rows.length > 0) {
    await query({
      text: `
        UPDATE cart_items
        SET quantity = quantity + 1
        WHERE id = $1
        `,
      values: [existing.rows[0].id],
    })
  } else {
    await query({
      text: `
        INSERT INTO cart_items (user_id, product_id, quantity)
        VALUES ($1, $2, 1)
        `,
      values: [userId, productId],
    })
  }

  res.json({ message: 'Added to cart' })
}

export async function getCartCount(req, res) {
  const userId = req.userId
  const result = await query({
    text: `
      SELECT COALESCE(SUM(quantity), 0) AS total_items
      FROM cart_items
      WHERE user_id = $1
      `,
    values: [userId],
  })

  res.json({ totalItems: Number(result.rows[0].total_items) })
}

export async function getAll(req, res) {
  const userId = req.userId
  const result = await query({
    text: `
      SELECT
        ci.id   AS "cartItemId",
        ci.quantity,
        p.title,
        p.artist,
        p.price
      FROM cart_items ci
      JOIN products p ON p.id = ci.product_id
      WHERE ci.user_id = $1
      `,
    values: [userId],
  })

  res.json({ items: result.rows })
}

export async function deleteItem(req, res) {
  const itemId = parseInt(req.params.itemId, 10)
  const userId = req.userId
  if (isNaN(itemId)) {
    return res.status(400).json({ error: 'Invalid item ID' })
  }

  const item = await query({
    text: 'SELECT quantity FROM cart_items WHERE id = $1 AND user_id = $2',
    values: [itemId, userId],
  })

  if (item.rows.length === 0) {
    return res.status(404).json({ error: 'Item not found' })
  }

  await query({
    text: `
      DELETE FROM cart_items
      WHERE id = $1 AND user_id = $2
      RETURNING id
      `,
    values: [itemId, userId],
  })

  res.status(204).send()
}

export async function deleteAll(req, res) {
  const userId = req.userId
  await query({
    text: `
      DELETE FROM cart_items
      WHERE user_id = $1
      `,
    values: [userId],
  })

  res.status(204).send()
}
