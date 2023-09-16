import { Express, Request, Response } from 'express'
import {
  healthCheckStatus,
  generateValidToken,
  generateInvalidToken,
  searchDriver,
} from './controller/match.controller'

function routes(app: Express) {
  app.get('/api/healthcheck', healthCheckStatus)

  app.get('/api/token', generateValidToken)

  app.get('/api/tokenNotAuthenticated', generateInvalidToken)

  app.post('/api/search/driver', searchDriver)
}

export default routes
