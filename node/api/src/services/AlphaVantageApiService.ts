import axios, { AxiosInstance } from 'axios'
import { env } from '../config/env'

export interface SearchEndpoinItemType{
  '1. symbol': string
  '2. name': string
  '3. type': string
  '4. region': string
  '5. marketOpen': string
  '6. marketClose': string
  '7. timezone': string
  '8. currency': string
  '9. matchScore': string
}

export interface SearchEndpoinType{
  'bestMatches': SearchEndpoinItemType[]
}

class AlphaVantageApiService {
  private readonly api: AxiosInstance
  private constructor (private readonly token) {
    this.api = axios.create({
      baseURL: 'https://www.alphavantage.co/query?'
    })
  }

  async searchStockNames (keywords: string): Promise<String[]> {
    const { data } = await this.api.get<SearchEndpoinType>('', {
      params: {
        function: 'SYMBOL_SEARCH',
        keywords,
        apikey: this.token

      }
    })

    const endpointOptions = data.bestMatches.map(item => item['1. symbol'])
    return endpointOptions
  }

  static connection (): AlphaVantageApiService {
    const apiInstance = new AlphaVantageApiService(env.token)
    return apiInstance
  }
}

export default AlphaVantageApiService
