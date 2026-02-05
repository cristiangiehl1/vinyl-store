import express from 'express'

import { registerUser } from '../controllers/authController.js'
import { meRouter } from './me.js'

const authRouter = express.Router()

authRouter.use('/me', meRouter)
authRouter.post('/register', registerUser)

export { authRouter }
