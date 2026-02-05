import { EXPIRATION_IN_MILLISECONDS } from './sessionsController.js'

function setSessionCookie({ res, token }) {
  res.cookie('sessionId', token, {
    path: '/',
    maxAge: EXPIRATION_IN_MILLISECONDS,
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
  })
}

function clearSessionCookie(res) {
  res.clearCookie('sessionId', {
    path: '/',
    maxAge: -1,
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
  })
}

const controller = {
  setSessionCookie,
  clearSessionCookie,
}

export { controller }
