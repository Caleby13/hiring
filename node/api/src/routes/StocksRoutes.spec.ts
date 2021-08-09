import request from 'supertest'
import { app } from '../app'

jest.setTimeout(20000)
describe('GET /stocks/searchEndpoint/:keywords ', () => {
  test('Shold return 200 if keywors is provided', async () => {
    const response = await request(app).get('/stocks/searchEndpoint/IBM')
    expect(response.status).toBe(200)
  })
})

describe('GET /stocks/:stock_name/quote ', () => {
  test('Shold return 200 if stock_name is provided', async () => {
    const response = await request(app).get('/stocks/IBM/quote')
    expect(response.status).toBe(200)
  })
})

describe('GET /stocks/:stock_name/history ', () => {
  test('Shold return 200 if stock_name, from and to are provided', async () => {
    const response = await request(app).get('/stocks/IBM/history?from=2021-08-02T12:00:00Z&to=2021-08-04T12:00:00Z')
    expect(response.status).toBe(200)
  })
  test('Shold return 400 if from not provided', async () => {
    const response = await request(app).get('/stocks/IBM/history?to=2021-08-04T12:00:00Z')
    expect(response.status).toBe(400)
  })
  test('Shold return 400 if to not provided', async () => {
    const response = await request(app).get('/stocks/IBM/history?from=2021-08-02T12:00:00Z')
    expect(response.status).toBe(400)
  })
})

describe('GET /stocks/:stock_name/compare', () => {
  test('Shold return 200 if stock_name is provided', async () => {
    const response = await request(app).get('/stocks/IBM/compare')
    expect(response.status).toBe(200)
  })
})

describe('GET /stocks/:stock_name/gains ', () => {
  test('Shold return 200 if stock_name, purchasedAmount and purchasedAt are provided', async () => {
    const response = await request(app).get('/stocks/IBM/gains?purchasedAmount=5&purchasedAt=2021-08-04T12:00:00Z')
    expect(response.status).toBe(200)
  })
  test('Shold return 400 if purchasedAmount not provided', async () => {
    const response = await request(app).get('/stocks/IBM/gains?purchasedAt=2021-08-04T12:00:00Z')
    expect(response.status).toBe(400)
  })
  test('Shold return 400 if purchasedAt not provided', async () => {
    const response = await request(app).get('/stocks/IBM/gains?purchasedAmount=5')
    expect(response.status).toBe(400)
  })
})
