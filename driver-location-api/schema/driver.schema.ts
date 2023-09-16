import { TypeOf, array, boolean, number, object, string } from 'zod'

/**
 * @openapi
 * components:
 *   schema:
 *     CreateDriverInput:
 *       type: object
 *       required:
 *        - name
 *        - destination
 *        - hasPassenger
 *        - idle
 *        - location
 *       properties:
 *         name:
 *           type: string
 *         destination:
 *           type: string
 *         hasPassenger:
 *           type: boolean
 *         idle:
 *           type: boolean
 *         location:
 *           type: object
 *     CreateDriverResponse:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

const payload = {
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    destination: string({
      required_error: 'Destination is required',
    }),
    hasPassenger: boolean({
      required_error: 'hasPassenger is required',
    }),
    idle: boolean({
      required_error: 'Idle is required',
    }),
    location: object({
      type: string({
        required_error: 'Location type is required',
      }),
      coordinates: number().array().nonempty(),
    }),
  }),
}

const params = {
  params: object({
    driverId: string({
      required_error: 'driverId is required',
    }),
  }),
}

export const createDriverSchema = object({
  ...payload,
})

export const updateDriverSchema = object({
  ...payload,
  ...params,
})

export const deleteDriverSchema = object({
  ...params,
})

export const getDriverSchema = object({
  ...params,
})

export type CreateDriverInput = TypeOf<typeof createDriverSchema>
export type UpdateDriverInput = TypeOf<typeof updateDriverSchema>
export type ReadDriverInput = TypeOf<typeof getDriverSchema>
export type DeleteDriverInput = TypeOf<typeof deleteDriverSchema>
