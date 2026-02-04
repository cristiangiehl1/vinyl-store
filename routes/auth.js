import express from 'express'

import {
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/authController.js'
import { meRouter } from './me.js'

const authRouter = express.Router()

authRouter.use('/me', meRouter)
authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.get('/logout', logoutUser)

export { authRouter }
