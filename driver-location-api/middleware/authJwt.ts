import { NextFunction, Request, Response } from 'express'

const jwt = require('jsonwebtoken')
import config from 'config'
const jwtKey = config.get<string>('secret_key')

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers['x-access-token']

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    })
  }

  jwt.verify(token, jwtKey, (err: Error, decoded: any) => {
    // if token is expired this returns an error
    if (!decoded.authenticated) {
      return res.status(401).send({
        message: 'Unauthorized!',
      })
    }
    next()
  })
}

export default verifyToken
