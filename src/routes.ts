import { Router } from 'express'
import { CRUDUserController } from './controllers/CRUDUserController'
import { LoginController } from './controllers/LoginController'
import { authMiddleware } from './middleware/authMiddleware'
import { PostController } from './controllers/PostController'

const routes = Router()

routes.post('/user', new CRUDUserController().create)
routes.put('/user/:id', new CRUDUserController().update)
routes.put('/user/address/:userId', new CRUDUserController().updateAddress)
routes.post('/user/login', new LoginController().login)
routes.get('/user/authentication', authMiddleware, new LoginController().getAuthenticatedUser)
routes.put('/user/password/:id', new CRUDUserController().updatePassword)
routes.post('/user/createPost/:userId', new PostController().create)
routes.post('/user/uploadPostImages/:postId', new PostController().uploadPostImages)
routes.get('/user/postImages/:postId', new PostController().postImages)
routes.get('/user/getPosts/:postId', new PostController().getPosts)
routes.delete('/user/deletePost/:postId', new PostController().deletePost)


export default routes


