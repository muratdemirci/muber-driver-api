import request from 'supertest'

const app = require('../app')

describe('API Proxy Route Tests', () => {
  // check healtcheck status
  test('/ should return 200', async () => {
    const response = await request(app).get('/api/healthcheck')
    expect(response.statusCode).toBe(200)
  })
})
