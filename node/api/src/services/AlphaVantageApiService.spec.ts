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

  test('Shold return 2 shares for comparison (service compareActions)', async () => {
    const sut = makeSut()
    const compareActions: CompareActionsPrices = await sut.compareActions('IBM', ['VALE'])
    expect(compareActions).toBeTruthy()
    expect(compareActions.lastPrices).toBeTruthy()
    expect(compareActions.lastPrices[0].name).toBe('IBM')
    expect(compareActions.lastPrices[1].name).toBe('VALE')
  })

  test('shold return the earnings projection of a share (service projectionEarningsWithPurchase)', async () => {
    const sut = makeSut()
    const projectionEarningsWithPurchase: EarningsProjection = await sut.projectionEarningsWithPurchase('IBM', 5, '2021-08-02')
    expect(projectionEarningsWithPurchase).toBeTruthy()
    expect(projectionEarningsWithPurchase.name).toBe('IBM')
    expect(projectionEarningsWithPurchase.purchasedAmount).toBeTruthy()
    expect(projectionEarningsWithPurchase.purchasedAt).toBeTruthy()
    expect(projectionEarningsWithPurchase.priceAtDate).toBeTruthy()
    expect(projectionEarningsWithPurchase.lastPrice).toBeTruthy()
    expect(projectionEarningsWithPurchase.capitalGains).toBeTruthy()
  })
})
