import { Request, Response } from 'express'
import AlphaVantageApiService from '../services/AlphaVantageApiService'
import { error, sucess } from '../utils/responseExpress'

class LastquoteController {
  async handle (req: Request, res: Response): Promise<Response> {
    try {
      const { stock_name } = req.params

      const apiAlphaVantage = AlphaVantageApiService.connection()
      const quoteOfTheAction = await apiAlphaVantage.searchQuoteEndpoint(stock_name)
      return sucess(quoteOfTheAction, res)
    } catch (err) {
      return error(err, res)
    }
  }
}

export default new LastquoteController()
