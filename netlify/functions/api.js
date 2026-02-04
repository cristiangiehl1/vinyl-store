import express from 'express'
import session from 'express-session'
import serverless from 'serverless-http'

import { appRouter } from '../../routes/index.js'

const app = express()

const secret = process.env.SPIRAL_SESSION_SECRET

app.use(express.json())

app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    },
  })
)

app.use('/api', appRouter)

export const handler = serverless(app)
