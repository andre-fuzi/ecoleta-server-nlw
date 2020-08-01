import express from 'express'
import multer from 'multer'
import multerConfig from './config/multer'
import { celebrate, Joi } from 'celebrate'

import CollectPointServices from './services/CollectPointServices'
import ItemServices from './services/ItemServices'

const routes = express.Router()
const upload = multer(multerConfig)

const collectPointServices = new CollectPointServices()
const itemServices = new ItemServices()

routes.get('/items', itemServices.getAll)

routes.get('/collect-points', collectPointServices.getAll)
routes.get('/collect-points/:id', collectPointServices.getById)

routes.post('/collect-points', upload.single('image'),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      whatsapp: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().max(2).required(),
      items: Joi.string().required()
    })
  }, {
    abortEarly: false
  }),
  collectPointServices.create)

export default routes
