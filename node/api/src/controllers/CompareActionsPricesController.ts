import { Request, Response } from 'express'
import AlphaVantageApiService from '../services/AlphaVantageApiService'
import { badRequest, error, sucess } from '../utils/responseExpress'

class CompareActionsPricesController {
  async handle (req: Request, res: Response): Promise<Response> {
    try {
      const { stock_name } = req.params
      const { stocks } = req.body
      const params = ['stocks']

      for (const param of params) {
        if (!req.query[param]) {
          return badRequest((param), res)
        }
      }

      const apiAlphaVantage = AlphaVantageApiService.connection()
      const lastActionPriceCompare = await apiAlphaVantage.compareActions(stock_name, stocks)

      return sucess(lastActionPriceCompare, res)
    } catch (err) {
      return error(res)
    }
  }
}
export default new CompareActionsPricesController()
