import axios, { AxiosInstance } from 'axios'
import { env } from '../config/env'
import { TimeSeriesDaily } from '../types/actionHistory'
import { SearchEndpoint } from '../types/searchEndpoint'
import { TimeSeriesInfraday } from '../types/timeSeriesInfraday'
import { dateStringToISOString, stringToDate } from '../utils/dateTreatment'

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

  private async checkDemoQuote (response: any) {
    const alert = response.Note

    if (alert) {
      throw new Error()
    }
  }

  async stockNamesSearch (keywords: string): Promise<string[]> {
    const { data } = await this.api.get<SearchEndpoint>('', {
      params: {
        function: 'SYMBOL_SEARCH',
        keywords,
        apikey: this.token

      }
    })
    this.checkDemoQuote(data)
    const endpointOptions = data.bestMatches.map(item => item['1. symbol'])

    return endpointOptions
  }

  async searchQuoteEndpoint (
    stock_name: string,
    interval: TimeInterval = '1min'): Promise<LastQuoteOfTheAction> {
    const { data } = await this.api.get<TimeSeriesInfraday>('', {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol: stock_name,
        interval,
        apikey: this.token

      }
    })
    this.checkDemoQuote(data)

    const name = data['Meta Data']['2. Symbol']
    const pricedAt = data['Meta Data']['3. Last Refreshed']
    const lastPrice = Number(data[`Time Series (${interval})`][pricedAt]['4. close'])

    const timeSeriesInfradayResponse: LastQuoteOfTheAction = {
      name,
      lastPrice,
      pricedAt: dateStringToISOString(pricedAt)
    }

    return timeSeriesInfradayResponse
  }

  async actionHistorySearch (
    stock_name: string,
    from: string,
    to: string,
    outputsize: OutputSize = 'compacte'): Promise<StockHistory> {
    const { data } = await this.api.get<TimeSeriesDaily>('', {
      params: {
        function: 'TIME_SERIES_DAILY_ADJUSTED',
        symbol: stock_name,
        outputsize,
        apikey: this.token
      }
    })
    this.checkDemoQuote(data)

    const name = data['Meta Data']['2. Symbol']
    const historyDates = Object.keys(data['Time Series (Daily)'])
    const timeSeries = data['Time Series (Daily)']
    const prices: PriceHistory[] = []
    for (const key of historyDates) {
      if (stringToDate(key) >= stringToDate(from) &&
      stringToDate(key) <= stringToDate(to)) {
        const daily = timeSeries[key]
        const opening = Number(daily['1. open'])
        const low = Number(daily['3. low'])
        const high = Number(daily['2. high'])
        const closing = Number(daily['4. close'])
        const pricedAt = key
        const pricing: PriceHistory = {
          opening,
          low,
          high,
          closing,
          pricedAt: dateStringToISOString(pricedAt)
        }

        prices.push(pricing)
      }
      continue
    }
    const stockHistory: StockHistory = { name, prices }
    return stockHistory
  }

  static connection (): AlphaVantageApiService {
    const apiInstance = new AlphaVantageApiService(env.token)
    return apiInstance
  }
}

export default AlphaVantageApiService
