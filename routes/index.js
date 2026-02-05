import express from 'express'

import { requireAuth } from '../middleware/requireAuth.js'
import { authRouter } from './auth.js'
import { cartRouter } from './cart.js'
import { productsRouter } from './products.js'
import { sessionRouter } from './session.js'

const appRouter = express.Router()

appRouter.use('/cart', requireAuth, cartRouter)
appRouter.use('/auth', authRouter)
appRouter.use('/products', productsRouter)
appRouter.use('/sessions', sessionRouter)

export { appRouter }
