import axios, { AxiosInstance } from 'axios'
import { env } from '../config/env'

class AlphaVantageApiService {
  private readonly api: AxiosInstance
  private constructor (private readonly token) {
    this.api = axios.create({
      baseURL: 'https://www.alphavantage.co/query?'
    })
  }

  static connection (): AlphaVantageApiService {
    const apiInstance = new AlphaVantageApiService(env.token)
    return apiInstance
  }
}

export default AlphaVantageApiService
