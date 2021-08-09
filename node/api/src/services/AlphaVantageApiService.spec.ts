import AlphaVantageApiService, { CompareActionsPrices, EarningsProjection, PriceLastAction, StockHistory } from './AlphaVantageApiService'

const makeSut = (): AlphaVantageApiService => {
  const sut = AlphaVantageApiService.connection()
  return sut
}

describe('AlphaVantage Api Service', () => {
  test('Shold return the stock endpoint names (service stockNamesSearch)', async () => {
    const sut = makeSut()
    const endpointNames: string[] = await sut.stockNamesSearch('BA')
    expect(endpointNames).toBeTruthy()
    expect(endpointNames.length > 0).toBe(true)
  })

  test('Should return the most recent quote for the stock (service searchQuoteEndpoint)', async () => {
    const sut = makeSut()
    const searchQuoteEndpoint: PriceLastAction = await sut.searchQuoteEndpoint('IBM')
    expect(searchQuoteEndpoint).toBeTruthy()
    expect(searchQuoteEndpoint.name).toBeTruthy()
    expect(searchQuoteEndpoint.lastPrice).toBeTruthy()
    expect(searchQuoteEndpoint.pricedAt).toBeTruthy()
  })

  test('Shold return the historical price of the share in an inclusive range (service actionHistorySearch)', async () => {
    const sut = makeSut()
    const actionHistorySearch: StockHistory = await sut.actionHistorySearch('IBM', '2021-08-02', '2021-07-02')
    expect(actionHistorySearch).toBeTruthy()
    expect(actionHistorySearch.name).toBeTruthy()
    expect(actionHistorySearch.prices).toBeTruthy()
  })
})
