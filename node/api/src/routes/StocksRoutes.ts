import { Router } from 'express'
import ActionHistoryController from '../controllers/ActionHistoryController'
import EndpointOptionsController from '../controllers/EndpointOptionsController'
import LastQuoteController from '../controllers/LastQuoteController'

const routes = Router()

routes.get('/searchEndpoint/:keywords', EndpointOptionsController.handle)
routes.get('/:stock_name/quote', LastQuoteController.handle)
routes.get('/:stock_name/history', ActionHistoryController.handle)

export default routes
