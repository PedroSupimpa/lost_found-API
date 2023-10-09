import { PostCategory } from './../entities/PostCategory';
import { Request, Response } from "express";
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
        const { images } = request.body;

        const postService = new PostService();

        const post = await postService.uploadPostImages(parseInt(postId), images);

        return response.json(post);


    }
}