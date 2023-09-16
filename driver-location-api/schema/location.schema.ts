import { TypeOf, array, boolean, number, object, string } from 'zod'

/**
 * @openapi
 * components:
 *   schema:
 *     LocationInput:
 *       type: object
 *       required:
 *        - longitude
 *        - latitude
 *       properties:
 *         longitude:
 *           type: string
 *         latitude:
 *           type: string
 *     NearestDriverResponse:
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
 */

const query = {
  query: object({
    longitude: string({
      required_error: 'longitude is required',
    }),
    latitude: string({
      required_error: 'latitude is required',
    }),
  }),
}

export const LocationSchema = object({
  ...query,
})

export type LocationInput = TypeOf<typeof LocationSchema>
