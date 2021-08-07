import { Request, Response } from 'express'
import AlphaVantageApiService from '../services/AlphaVantageApiService'
import { error, sucess } from '../utils/responseExpress'

class EndpointOptionsController {
  async handle (req: Request, res: Response): Promise<Response> {
    try {
      const { keywords } = req.params

      const apiAlphaVantage = AlphaVantageApiService.connection()
      const endpoitSearch = await apiAlphaVantage.stockNamesSearch(keywords)
      return sucess(endpoitSearch, res)
    } catch (err) {
      return error(err, res)
    }
  }
}

export default new EndpointOptionsController()
