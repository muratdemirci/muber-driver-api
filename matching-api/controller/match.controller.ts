import { Request, Response } from 'express'
import config from 'config'
import { requestHandler } from '../handlers/requestHandler'

const jwt = require('jsonwebtoken')
const jwtKey = config.get<string>('secret_key')
const jwtExpirySeconds = 300
const driverLocationApiUrl = config.get<string>('driver_location_api_url')

export async function healthCheckStatus(req: Request, res: Response) {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  }

  try {
    res.send(healthcheck)
  } catch (error) {
    res.status(503).send(error)
  }
}

export async function generateValidToken(req: Request, res: Response) {
  console.log(`jwtKey: ${JSON.stringify(jwtKey)}`)
  const validToken = jwt.sign({ authenticated: true }, jwtKey, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds,
  })

  try {
    res.send(validToken)
  } catch (error) {
    res.status(503).send(error)
  }
}

export async function generateInvalidToken(req: Request, res: Response) {
  const validToken = jwt.sign({ authenticated: false }, jwtKey, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds,
  })

  try {
    res.send(validToken)
  } catch (error) {
    res.status(503).send(error)
  }
}

export async function searchDriver(req: Request, res: Response) {
  console.log(`searchDriver`)
  const longitude = req.body['longitude']

  const latitude = req.body['latitude']

  const location = `${driverLocationApiUrl}/api/search/location?longitude=${longitude}&latitude=${latitude}`

  const accessToken = `${req.headers['x-access-token']}`

  const driverData = await requestHandler(location, accessToken)

  try {
    res.send(driverData)
  } catch (error) {
    res.status(404).send(error)
  }
  // get request with undici
}
