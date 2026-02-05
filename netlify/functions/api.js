import cookieParser from 'cookie-parser'
import express from 'express'
import serverless from 'serverless-http'

import { appRouter } from '../../routes/index.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api', appRouter)

export const handler = serverless(app)
