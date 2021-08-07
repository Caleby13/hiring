import { Request, Response } from 'express'
import AlphaVantageApiService from '../services/AlphaVantageApiService'
import { HttpResponse } from '../types/http'

class EndpointOptionsController {
  async handle (req: Request, res: Response): Promise<HttpResponse> {
    const { keywords } = req.params

    const apiAlphaVantage = AlphaVantageApiService.connection()
    const endpoitSearch = await apiAlphaVantage.stockNamesSearch(keywords)
    return res.json(endpoitSearch)
  }
}

export default new EndpointOptionsController()
