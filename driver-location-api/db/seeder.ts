import DriverModel from '../models/driver.model'

const mongoose = require('mongoose')
const fs = require('fs')
const csv = require('csv-parser')
const driverLocationsCsv = '.././driver_locations_init_coordinates.csv'
const casual = require('casual')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

async function fileLineCount({ fileLocation }) {
  const { stdout } = await exec(`cat ${fileLocation} | wc -l`)
  return parseInt(stdout)
}

require('dotenv').config()

mongoose
  .connect(
    'mongodb+srv://deusmur:XhfiqPO4FfGkHcuZ@cluster0.ezu52vg.mongodb.net/?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log(`MongoDB Connected:`)
  })
  .catch((err: any) => {
    console.log(err)
  })

const seedDrivers: any[] = []
let lineCount: number

async function lineCheck() {
  lineCount = await fileLineCount({ fileLocation: driverLocationsCsv })
  // console.log(`line count: ${lineCount}`)
}

lineCheck()

fs.createReadStream(driverLocationsCsv)
  .pipe(csv())
  .on('data', (location: any) =>
    seedDrivers.push({
      name: casual.full_name,
      destination: casual.address,
      hasPassenger: false,
      idle: false,
      location: {
        type: 'Point',
        coordinates: Object.values(location),
      },
    })
  )
  .on('end', () => {
    seedDB()
  })

async function seedDB() {
  console.log('driver location seed starts')
  // unordered insert for preventing duplicated data
  await DriverModel.insertMany(seedDrivers, { ordered: false })
    .then(() => console.log('driver location seed ends'))
    .then(() => process.exit(0))
}
