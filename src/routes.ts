import { Router } from 'express'
import { CRUDUserController } from './controllers/CRUDUserController'
import { LoginController } from './controllers/LoginController'

const routes = Router()

routes.post('/user', new CRUDUserController().create)
routes.put('/user/:id', new CRUDUserController().update)
routes.put('/user/address/:userId', new CRUDUserController().updateAddress)
routes.post('/user/login', new LoginController().login)
routes.get('/user/authentication', new LoginController().getAuthenticatedUser)


export default routes


