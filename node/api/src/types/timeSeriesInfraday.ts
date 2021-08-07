export interface TimeSeriesInfraday {
  'Meta Data': TimeSeriesInfradayMetaDataItem
  'Time Series (1min)'?: TimeSeriesInfradayItem
  'Time Series (5min)'?: TimeSeriesInfradayItem
  'Time Series (15min)'?: TimeSeriesInfradayItem
  'Time Series (30min)'?: TimeSeriesInfradayItem
  'Time Series (60min)'?: TimeSeriesInfradayItem

}

export interface TimeSeriesInfradayMetaDataItem {
  '1. Information': string
  '2. Symbol': string
  '3. Last Refreshed': string
  '4. Interval': string
  '5. Output Size': string
  '6. Time Zone': string
}

export interface TimeSeriesInfradayItem {
  [dataTime: string]: {
    '1. open': string
    '2. high': string
    '3. low': string
    '4. close': string
    '5. volume': string}
}
