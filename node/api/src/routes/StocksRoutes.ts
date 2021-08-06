import { Router } from 'express'

import AlphaVantageController from '../controllers/AlphaVantageController'

const routes = Router()

routes.get('/searchEndpoint', AlphaVantageController.showOptionsEndpoint)

export default routes
