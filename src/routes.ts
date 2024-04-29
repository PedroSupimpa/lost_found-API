import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { LoginController } from './controllers/LoginController'
import { authMiddleware } from './middleware/authMiddleware'
import { PostController } from './controllers/PostController'

const routes = Router()

routes.post('/user/create', new UserController().create)
routes.post('/user/login', new LoginController().login)
routes.get('/user/authentication', authMiddleware, new LoginController().getAuthenticatedUser)
routes.put('/user/:id', authMiddleware,new UserController().update)
routes.put('/user/address/:userId',authMiddleware, new UserController().updateAddress)
routes.put('/user/password/:id', authMiddleware, new UserController().updatePassword)
routes.post('/user/createPost/:userId',authMiddleware, new PostController().create)
routes.post('/user/uploadPostImages/:postId',authMiddleware, new PostController().uploadPostImages)
routes.get('/user/postImages/:postId', new PostController().postImages)
routes.get('/user/getPosts', new PostController().getPosts)
routes.delete('/user/deletePost/:postId',authMiddleware, new PostController().deletePost)


export default routes


