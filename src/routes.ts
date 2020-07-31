import express from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import CollectPointServices from './services/CollectPointServices'
import ItemServices from './services/ItemServices'

const routes = express.Router()
const upload = multer(multerConfig)

const collectPointServices = new CollectPointServices()
const itemServices = new ItemServices()

routes.get('/items', itemServices.getAll)

routes.get('/collect-points', collectPointServices.getAll)
routes.get('/collect-points/:id', collectPointServices.getById)

routes.post('/collect-points', upload.single('image'), collectPointServices.create)

export default routes
