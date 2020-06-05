import express from 'express'

import CollectPointServices from './services/CollectPointServices'
import ItemServices from './services/ItemServices'

const routes = express.Router()
const collectPointServices = new CollectPointServices()
const itemServices = new ItemServices()

routes.get('/items', itemServices.getAll)

routes.post('/collect-points', collectPointServices.create)
routes.get('/collect-points', collectPointServices.getAll)
routes.get('/collect-points/:id', collectPointServices.getById)

export default routes
