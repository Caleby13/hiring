import { Request, Response } from 'express'
import AlphaVantageApiService from '../services/AlphaVantageApiService'
import { HttpResponse } from '../types/http'

class LastquoteController {
  async handle (req: Request, res: Response): Promise<HttpResponse> {
    const { stock_name } = req.params

    const apiAlphaVantage = AlphaVantageApiService.connection()
    const quoteOfTheAction = await apiAlphaVantage.searchQuoteEndpoint(stock_name)
    return res.json(quoteOfTheAction)
  }
}

export default new LastquoteController()
