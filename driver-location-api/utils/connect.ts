import config from 'config'
import logger from './logger'
import mongoose from 'mongoose'

async function connect() {
  const dbUri = config.get<string>('dbUri')

  try {
    await mongoose.connect(dbUri)
    logger.info('DB connected')
  } catch (error) {
    logger.error(`Could not connect to db, error: ${JSON.stringify(error)}`)
    process.exit(1)
  }
}

export default connect
