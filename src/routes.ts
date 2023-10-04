import { Router } from 'express'
import { CreateUserController, UpdateUserAddressController, UpdateUserController } from './controllers/CRUDUserController'

const routes = Router()

routes.post('/user', new CreateUserController().handle)
routes.put('/user/:id', new UpdateUserController().handle)
routes.put('/user/address/:userId', new UpdateUserAddressController().handle)


export default routes


