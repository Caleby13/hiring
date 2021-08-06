import { Request, Response } from 'express'
import AlphaVantageApiService from '../services/AlphaVantageApiService'

class AlphaVantageController {
  async showOptionsEndpoint (req: Request, res: Response): Promise<Response> {
    const { keywords } = req.body
    const apiAlphaVantage = AlphaVantageApiService.connection()
    const endpoitSearch = await apiAlphaVantage.searchStockNames(keywords)
    return res.json(endpoitSearch)
  }
}

export default new AlphaVantageController()
