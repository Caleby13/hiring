import AlphaVantageApiService from '../services/AlphaVantageApiService'
import { HttpResponse } from '../types/http'
import { Response, Request } from 'express'

class ActionHistoryController {
  async handle (req: Request, res: Response): Promise<HttpResponse> {
    const { stock_name } = req.params
    const { from, to } = req.query
    const apiAlphaVantage = AlphaVantageApiService.connection()
    const actionHistory = await apiAlphaVantage.actionHistorySearch(stock_name, String(from), String(to))

    return res.json(actionHistory)
  }
}

export default new ActionHistoryController()
