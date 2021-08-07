import { Router } from 'express'
import EndpointOptionsController from '../controllers/EndpointOptionsController'
import LastQuoteController from '../controllers/LastQuoteController'

const routes = Router()

routes.get('/searchEndpoint/:keywords', EndpointOptionsController.handle)
routes.get('/:stock_name/quote', LastQuoteController.handle)

export default routes
