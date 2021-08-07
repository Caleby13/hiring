import axios, { AxiosInstance } from 'axios'
import { env } from '../config/env'
import { SearchEndpoint } from '../types/searchEndpoint'

export type TimeInterval = '1min' | '5min' | '15min' | '30min' | '60min'
export type OutputSize = 'compacte' | 'full'

export interface LastQuoteOfTheAction {
  'name': string
  'lastPrice': number
  'pricedAt': string // data e hora no formato ISO 8601, UTC
}

export interface StockHistory{
  name: string
  prices: PriceHistory[]
}

export interface PriceHistory {
  'opening': number
  'low': number
  'high': number
  'closing': number
  'pricedAt': string // data no formato ISO 8601, UTC
}

class AlphaVantageApiService {
  private readonly api: AxiosInstance
  private constructor (private readonly token: string) {
    this.api = axios.create({
      baseURL: 'https://www.alphavantage.co/query?'
    })
  }

  async stockNamesSearch (keywords: string): Promise<string[]> {
    const { data } = await this.api.get<SearchEndpoint>('', {
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
