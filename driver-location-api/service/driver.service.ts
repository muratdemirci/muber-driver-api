import { FilterQuery, QueryOptions, UpdateQuery, ObjectId } from 'mongoose'
import DriverModel, { DriverDocument, DriverInput } from '../models/driver.model'
import { databaseResponseTimeHistogram } from '../utils/metrics'

export async function createDriver(input: DriverInput) {
  const metricsLabels = {
    operation: 'createDriver',
  }

  const timer = databaseResponseTimeHistogram.startTimer()
  try {
    const result = await DriverModel.create(input)
    console.log(`driver service: ${JSON.stringify(input)}`)
    timer({ ...metricsLabels, success: 'true' })
    return result
  } catch (e) {
    timer({ ...metricsLabels, success: 'false' })
    throw e
  }
}

export async function findDriver(
  query: FilterQuery<DriverDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'findDriver',
  }

  const timer = databaseResponseTimeHistogram.startTimer()
  try {
    const result = await DriverModel.findOne(query, {}, options)
    timer({ ...metricsLabels, success: 'true' })
    return result
  } catch (error) {
    timer({ ...metricsLabels, success: 'false' })

    throw error
  }
}

export async function findAndUpdateDriver(
  query: FilterQuery<DriverDocument>,
  update: UpdateQuery<DriverDocument>,
  options: QueryOptions
) {
  return DriverModel.findOneAndUpdate(query, update, options)
}

export async function deleteDriver(query: FilterQuery<DriverDocument>) {
  return DriverModel.deleteOne(query)
}

export async function findNearestDriver(longitude: string, latitude: string) {
  const metricsLabels = {
    operation: 'findNearestDriver',
  }

  const timer = databaseResponseTimeHistogram.startTimer()

  try {
    const result = await DriverModel.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
        },
      },
    }).limit(1)

    timer({ ...metricsLabels, success: 'true' })
    console.log(`result: ${JSON.stringify(result)}`)
    return result
  } catch (error) {
    timer({ ...metricsLabels, success: 'false' })
    console.log(`result: ${JSON.stringify(error)}`)
    throw error
  }
}
