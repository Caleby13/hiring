import axios, { AxiosInstance } from 'axios'
import { env } from '../config/env'
import { TimeSeriesDaily } from '../types/actionHistory'
import { SearchEndpoint } from '../types/searchEndpoint'
import { TimeSeriesInfraday } from '../types/timeSeriesInfraday'
import { stringToDateISO, stringToDate, formatDate } from '../utils/dateTreatment'

export type TimeInterval = '1min' | '5min' | '15min' | '30min' | '60min'
export type OutputSize = 'compacte' | 'full'

export interface PriceLastAction {
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

export interface CompareActionsPrices {
  lastPrices: PriceLastAction[]
}

export interface EarningsProjection{
  'name': string
  'purchasedAmount': number
  'purchasedAt': string // data em formato ISO 8601,
  'priceAtDate': number // preço na data de compra
  'lastPrice': number // preço mais recente
  'capitalGains': number // ganhos ou perdas com a ação, em reais
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

  private async timeSeriesInfraday (stock_name: string,
    interval: TimeInterval = '1min'): Promise<TimeSeriesInfraday> {
    const { data } = await this.api.get<TimeSeriesInfraday>('', {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol: stock_name,
        interval,
        apikey: this.token

      }
    })
    this.checkDemoQuote(data)
    return data
  }

  async searchQuoteEndpoint (
    stock_name: string,
    interval: TimeInterval = '1min'): Promise<PriceLastAction> {
    const timeSeriesInfraday = await this.timeSeriesInfraday(stock_name, interval)
    const name = timeSeriesInfraday['Meta Data']['2. Symbol']
    const pricedAt = timeSeriesInfraday['Meta Data']['3. Last Refreshed']
    const lastPrice = Number(timeSeriesInfraday[`Time Series (${interval})`][pricedAt]['4. close'])

    const timeSeriesInfradayResponse: PriceLastAction = {
      name,
      lastPrice,
      pricedAt: stringToDateISO(pricedAt)
    }

    return timeSeriesInfradayResponse
  }

  private async timeSeriesDailyAjusted (stock_name: string, outputsize: OutputSize = 'full'): Promise<TimeSeriesDaily> {
    const { data } = await this.api.get<TimeSeriesDaily>('', {
      params: {
        function: 'TIME_SERIES_DAILY_ADJUSTED',
        symbol: stock_name,
        outputsize,
        apikey: this.token
      }
    })
    this.checkDemoQuote(data)
    return data
  }

  async actionHistorySearch (
    stock_name: string,
    from: string,
    to: string,
    outputsize: OutputSize = 'full'): Promise<StockHistory> {
    const timeSeriesDailyAjusted = await this.timeSeriesDailyAjusted(stock_name, outputsize)
    const name = timeSeriesDailyAjusted['Meta Data']['2. Symbol']
    const historyDates = Object.keys(timeSeriesDailyAjusted['Time Series (Daily)'])
    const timeSeries = timeSeriesDailyAjusted['Time Series (Daily)']
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
          pricedAt: stringToDateISO(pricedAt)
        }

        prices.push(pricing)
      }
      continue
    }
    const stockHistory: StockHistory = { name, prices }
    return stockHistory
  }

  async compareActions (
    stock_name: string,
    stock_name_compare: string[] = []): Promise<CompareActionsPrices> {
    const actionsList = stock_name_compare
    actionsList.unshift(stock_name)
    const lastPrices: PriceLastAction[] = []

    for (const action of actionsList) {
      const timeSeriesDailyAjusted = await this.timeSeriesDailyAjusted(action, 'compacte')
      const lastRefreshed = timeSeriesDailyAjusted['Meta Data']['3. Last Refreshed']
      const name = timeSeriesDailyAjusted['Meta Data']['2. Symbol']
      const lastPrice = Number(timeSeriesDailyAjusted['Time Series (Daily)'][lastRefreshed]['4. close'])

      const actionLastPrice: PriceLastAction = {
        name,
        lastPrice,
        pricedAt: stringToDateISO(lastRefreshed)
      }
      lastPrices.push(actionLastPrice)
    }

    const compareActionsPrices: CompareActionsPrices = {
      lastPrices: lastPrices
    }

    return compareActionsPrices
  }

  async projectionEarningsWithPurchase (stock_name: string,
    purchasedAmount: number,
    purchasedAt: string): Promise<EarningsProjection> {
    const timeSeriesDailyAjusted = await this.timeSeriesDailyAjusted(stock_name, 'full')
    const lastRefreshed = timeSeriesDailyAjusted['Meta Data']['3. Last Refreshed']
    const name = timeSeriesDailyAjusted['Meta Data']['2. Symbol']
    const lastPrice = Number(timeSeriesDailyAjusted['Time Series (Daily)'][lastRefreshed]['4. close'])
    const priceAtDate = Number(timeSeriesDailyAjusted['Time Series (Daily)'][formatDate(purchasedAt)]['4. close'])
    const capitalGains = (lastPrice * Number(purchasedAmount)) - (priceAtDate * Number(purchasedAmount))

    const earningsProjection: EarningsProjection = {
      name,
      purchasedAmount,
      purchasedAt,
      priceAtDate,
      lastPrice,
      capitalGains

    }

    return earningsProjection
  }

  static connection (): AlphaVantageApiService {
    const apiInstance = new AlphaVantageApiService(env.token)
    return apiInstance
  }
}

export default AlphaVantageApiService
