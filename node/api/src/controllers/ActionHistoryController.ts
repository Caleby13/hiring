import { Request, Response } from 'express'
import AlphaVantageApiService from '../services/AlphaVantageApiService'
import { badRequest, error, sucess } from '../utils/responseExpress'

class ActionHistoryController {
  async handle (req: Request, res: Response): Promise<Response> {
    try {
      const { stock_name } = req.params
      const { from, to } = req.query
      const params = ['from', 'to']

      for (const param of params) {
        if (!req.query[param]) {
          return badRequest((param), res)
        }
      }

      const apiAlphaVantage = AlphaVantageApiService.connection()
      const actionHistory = await apiAlphaVantage.actionHistorySearch(stock_name, String(from), String(to))

      return sucess(actionHistory, res)
    } catch (err) {
      return error(res)
    }
  }
}

export default new ActionHistoryController()
