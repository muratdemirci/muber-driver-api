import express, { Request, Response } from 'express'
// import deserializeUser from './middleware/deserializeUser'
import { restResponseTimeHistogram, startMetricsServer } from './utils/metrics'

import config from 'config'
import connect from './utils/connect'
import dotenv from 'dotenv'
import logger from './utils/logger'
import responseTime from 'response-time'
import routes from './routes'

dotenv.config()

const port = config.get<number>('port')

const app = express()

app.use(express.json())

// check jwt token
// app.use(deserializeUser)

app.use(
  responseTime((req: Request, res: Response, time: number) => {
    if (req?.route?.path) {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
        },
        time * 1000
      )
    }
  })
)

app.listen(port, async () => {
  logger.info(`muber Driver Location Api running at http://localhost:${port}`)

  await connect()

  routes(app)

  startMetricsServer()
})

module.exports = app
