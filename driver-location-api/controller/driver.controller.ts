import { CreateDriverInput, UpdateDriverInput } from '../schema/driver.schema'
import { Request, Response } from 'express'
import {
  createDriver,
  deleteDriver,
  findAndUpdateDriver,
  findDriver,
  findNearestDriver,
} from '../service/driver.service'
import { LocationInput } from '../schema/location.schema'

export async function createDriverHandler(
  req: Request<{}, {}, CreateDriverInput['body']>,
  res: Response
) {
  const body = req.body

  const driver = await createDriver({ ...body })

  return res.send(driver)
}

export async function updateDriverHandler(
  req: Request<UpdateDriverInput['params']>,
  res: Response
) {
  const driverId = req.params.driverId
  const update = req.body

  const driver = await findDriver({ driverId })

  if (!driver) {
    return res.sendStatus(404)
  }

  const updatedDriver = await findAndUpdateDriver({ driverId }, update, {
    new: true,
  })

  return res.send(updatedDriver)
}

export async function getDriverHandler(req: Request<UpdateDriverInput['params']>, res: Response) {
  const driverId = req.params.driverId
  const driver = await findDriver({ driverId })

  if (!driver) {
    return res.sendStatus(404)
  }

  return res.send(driver)
}

export async function deleteDriverHandler(
  req: Request<UpdateDriverInput['params']>,
  res: Response
) {
  const driverId = req.params.driverId

  const driver = await findDriver({ driverId })

  if (!driver) {
    return res.sendStatus(404)
  }

  await deleteDriver({ driverId })

  return res.sendStatus(200)
}

export async function getNearestDriverHandler(req: Request<LocationInput['query']>, res: Response) {
  console.log('nearest driver')

  const longitude: string = req.query.longitude as string
  const latitude: string = req.query.latitude as string

  const driver = await findNearestDriver(longitude, latitude)

  if (!driver) {
    return res.sendStatus(404)
  }

  return res.send(driver)
}

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
