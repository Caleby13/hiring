import { Router } from 'express'

import AlphaVantageController from '../controllers/AlphaVantageController'

const routes = Router()

routes.get('/1', AlphaVantageController.showOptionsEndpoint)

export default routes
