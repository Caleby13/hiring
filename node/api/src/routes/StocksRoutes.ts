import { Router } from 'express'
import ActionHistoryController from '../controllers/ActionHistoryController'
import CompareActionsPricesController from '../controllers/CompareActionsPricesController'
import EndpointOptionsController from '../controllers/EndpointOptionsController'
import LastQuoteController from '../controllers/LastQuoteController'

const routes = Router()

routes.get('/searchEndpoint/:keywords', EndpointOptionsController.handle)
routes.get('/:stock_name/quote', LastQuoteController.handle)
routes.get('/:stock_name/history', ActionHistoryController.handle)
routes.get('/:stock_name/compare', CompareActionsPricesController.handle)

export default routes
