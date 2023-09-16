import { Express, Request, Response, NextFunction } from 'express'
import validateResource from './middleware/validateResource'
import verifyToken from './middleware/authJwt'
import {
  createDriverSchema,
  deleteDriverSchema,
  getDriverSchema,
  updateDriverSchema,
} from './schema/driver.schema'
import {
  createDriverHandler,
  deleteDriverHandler,
  getDriverHandler,
  getNearestDriverHandler,
  healthCheckStatus,
  updateDriverHandler,
} from './controller/driver.controller'
import { LocationSchema } from './schema/location.schema'

function routes(app: Express) {
  app.get('/api/healthcheck', healthCheckStatus)

  app.post(
    '/api/driver-locations',
    [verifyToken],
    validateResource(createDriverSchema),
    createDriverHandler
  )

  app.put(
    '/api/driver-locations/:driverId',
    [verifyToken],
    [validateResource(updateDriverSchema)],
    updateDriverHandler
  )

  app.get(
    '/api/driver-locations/:driverId',
    [verifyToken],
    validateResource(getDriverSchema),
    getDriverHandler
  )

  app.delete(
    '/api/driver-locations/:driverId',
    [verifyToken],
    validateResource(deleteDriverSchema),
    deleteDriverHandler
  )

  app.get(
    '/api/search/location',
    [verifyToken],
    validateResource(LocationSchema),
    getNearestDriverHandler
  )
}

export default routes
