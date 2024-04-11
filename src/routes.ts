import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { LoginController } from './controllers/LoginController'
import { authMiddleware } from './middleware/authMiddleware'
import { PostController } from './controllers/PostController'

const routes = Router()

routes.post('/user', new UserController().create)
routes.post('/user/login', new LoginController().login)

routes.use(authMiddleware)
routes.get('/user/authentication', new LoginController().getAuthenticatedUser)
routes.put('/user/:id', new UserController().update)
routes.put('/user/address/:userId', new UserController().updateAddress)
routes.put('/user/password/:id', new UserController().updatePassword)
routes.post('/user/createPost/:userId', new PostController().create)
routes.post('/user/uploadPostImages/:postId', new PostController().uploadPostImages)
routes.get('/user/postImages/:postId', new PostController().postImages)
routes.get('/user/getPosts', new PostController().getPosts)
routes.delete('/user/deletePost/:postId', new PostController().deletePost)


export default routes


