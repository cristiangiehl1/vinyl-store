import express from 'express'

import {
  createSession,
  deleteSession,
} from '../controllers/sessionsController.js'

const sessionRouter = express.Router()

sessionRouter.post('/', createSession)
sessionRouter.delete('/', deleteSession)

export { sessionRouter }
