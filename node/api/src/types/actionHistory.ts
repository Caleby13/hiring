export interface TimeSeriesDaily{
  'Meta Data': TimeSeriesDailyMetaDataItem
  'Time Series (Daily)': TimeSeriesDailyItem

}

export interface TimeSeriesDailyMetaDataItem {
  '1. Information': string
  '2. Symbol': string
  '3. Last Refreshed': string
  '4. Interval': string
  '5. Output Size': string
  '6. Time Zone': string
}

export interface TimeSeriesDailyItem {
  [dataTime: string]: {
    '1. open': string
    '2. high': string
    '3. low': string
    '4. close': string
    '5. adjusted close': string
    '6. volume': string
    '7. dividend amount': string
    '8. split coefficient': string
  }
}
