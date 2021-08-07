import { Router } from 'express'
import EndpointOptionsController from '../controllers/EndpointOptionsController'

const routes = Router()

routes.get('/searchEndpoint/:keywords', EndpointOptionsController.handle)

export default routes
