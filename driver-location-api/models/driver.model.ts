import mongoose from 'mongoose'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10)

export interface DriverInput {
  name: string
  destination: string
  hasPassenger: boolean
  idle: boolean
  location: object
}

export interface DriverDocument extends DriverInput, mongoose.Document {
  createdAt: Date
  updatedAt: Date
}

const driverSchema = new mongoose.Schema(
  {
    driverId: {
      type: String,
      required: true,
      unique: true,
      default: () => `driver_${nanoid()}`,
    },
    name: { type: String, required: false },
    destination: { type: String, required: false },
    idle: { type: Boolean, required: false },
    hasPassenger: { type: Boolean, required: false },
    location: { type: { type: String, default: 'Point' }, coordinates: { type: [Number] } },
  },
  {
    timestamps: true,
  }
)

driverSchema.index({ location: '2dsphere' })

const DriverModel = mongoose.model<DriverDocument>('Driver', driverSchema)

export default DriverModel
