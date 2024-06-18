import { Router } from 'express'
import { LoginController } from './controllers/LoginController'
import { PostController } from './controllers/PostController'
import { UserController } from './controllers/UserController'
import { authMiddleware } from './middleware/authMiddleware'

const routes = Router()

routes.post('/user/create', new UserController().create)
routes.post('/user/login', new LoginController().login)
routes.get('/user/authentication', authMiddleware, new LoginController().getAuthenticatedUser)
routes.put('/user/:id', authMiddleware,new UserController().update)
routes.put('/user/address/:userId',authMiddleware, new UserController().updateAddress)
routes.put('/user/password/:id', authMiddleware, new UserController().updatePassword)
routes.post('/user/createPost',authMiddleware, new PostController().create)
routes.post('/user/imageLink',authMiddleware, new PostController().imageLink)
routes.get('/user/postImages/:postId', new PostController().postImages)
routes.get('/user/getPosts', new PostController().getPosts)
routes.get('/user/Posts', authMiddleware, new PostController().getPostByUser)
routes.delete('/user/deletePost/:postId',authMiddleware, new PostController().deletePost)
routes.post('/new-category', new PostController().createPostCategory)
routes.get('/get-categories', new PostController().getPostCategories)


export default routes


