import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { PostService } from "../services/PostService";



export class PostController {

    async create(request: Request, response: Response) {
        const { userId } = request.params;
        const { title, description, category, location } = request.body;

        const postService = new PostService();

        const post = await postService.create({
            title, description, category, location, createdDate: new Date(),
            createdByUser: parseInt(userId)
        });

        return response.json(post);

    }


    async uploadPostImages(request: Request, response: Response) {
        const { postId } = request.params;
        const imageLink = uuidv4();
        const postService = new PostService();

        const postImagesUpload = postService.uploadPostImages(request, response, parseInt(postId), imageLink);

        return response.json(postImagesUpload);

    }


    async postImages(request: Request, response: Response) {

        const { postId } = request.params;

        const postService = new PostService();
        const postImages = await postService.postImages(parseInt(postId));

        return response.json(postImages);

    }

    async getPosts(request: Request, response: Response) {
        const { postId } = request.params;

        const postService = new PostService();
        const posts = await postService.getPosts(parseInt(postId));

        return response.json(posts);


    }

    async deletePost(request: Request, response: Response) {
        const { postId } = request.params;

        const postService = new PostService();
        const posts = await postService.deletePost(parseInt(postId));

        return response.json(posts);
    }
}