import { Router } from 'express'
import multer from 'multer'

import OrphanagesController from './controllers/OrphanagesController'
import UserController from './controllers/UserController'
import AuthController from './controllers/AuthController'

import uploadConfig from './config/upload'
import auth from './middleware/auth'

const routes = Router()
const upload = multer(uploadConfig);


routes.get('/orphanages', OrphanagesController.index)
routes.get('/orphanages/:id', OrphanagesController.show)
routes.post('/orphanages', upload.array('images'), OrphanagesController.create)
routes.post('/user', UserController.create)
routes.put('/user', UserController.update)

routes.post('/authenticate', AuthController.authenticate)
routes.post('/forgot-password', AuthController.forgotPass)


export default routes;