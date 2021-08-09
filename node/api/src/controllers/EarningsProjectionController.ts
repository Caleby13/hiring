import { Request, Response } from 'express'
import AlphaVantageApiService from '../services/AlphaVantageApiService'
import { badRequest, error, sucess } from '../utils/responseExpress'

class EarningsProjectionController {
  async handle (req: Request, res: Response): Promise<Response> {
    try {
      const { stock_name } = req.params
      const { purchasedAmount, purchasedAt } = req.query
      const params = ['purchasedAmount', 'purchasedAt']

      for (const param of params) {
        if (!req.query[param]) {
          return badRequest((param), res)
        }
      }

      const apiAlphaVantage = AlphaVantageApiService.connection()
      const earningsProjection = await apiAlphaVantage
        .projectionEarningsWithPurchase(stock_name, Number(purchasedAmount), String(purchasedAt))
      return sucess(earningsProjection, res)
    } catch (err) {
      return error(res)
    }
  }
}
export default new EarningsProjectionController()
