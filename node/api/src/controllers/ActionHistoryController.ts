import { Request, Response } from 'express'
import AlphaVantageApiService from '../services/AlphaVantageApiService'
import { error, sucess } from '../utils/responseExpress'

class ActionHistoryController {
  async handle (req: Request, res: Response): Promise<Response> {
    try {
      const { stock_name } = req.params
      const { from, to } = req.query
      const apiAlphaVantage = AlphaVantageApiService.connection()
      const actionHistory = await apiAlphaVantage.actionHistorySearch(stock_name, String(from), String(to))

      return sucess(actionHistory, res)
    } catch (err) {
      return error(res)
    }
  }
}

export default new ActionHistoryController()
