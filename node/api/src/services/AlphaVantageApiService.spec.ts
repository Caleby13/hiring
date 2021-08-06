import AlphaVantageApiService from './AlphaVantageApiService'

const makeSut = (): AlphaVantageApiService => {
  const sut = AlphaVantageApiService.connection()
  return sut
}

describe('AlphaVantage Api Service', () => {
  test('shold return the stock endpoint names', async () => {
    const sut = makeSut()
    const endpointNames = await sut.searchStockNames('BA')
    expect(endpointNames).toBeTruthy()
    expect(endpointNames.length > 0).toBe(true)
  })
})
