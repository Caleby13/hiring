import { Router } from 'express'
import StocksRoutes from './routes/StocksRoutes'

const routes = Router()

routes.use('/stocks', StocksRoutes)

export default routes
