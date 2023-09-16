import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import config from 'config'
import responseTime from 'response-time'
import logger from './utils/logger'
import routes from './routes'
import { restResponseTimeHistogram, startMetricsServer } from './utils/metrics'
import swaggerDocs from './utils/swagger'

const port = config.get<number>('port')

const app = express()

app.use(express.json())

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
  logger.info(`muber Matching Api running at http://localhost:${port}`)

  routes(app)

  startMetricsServer()

  swaggerDocs(app, port)
})
