import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { IGetPostsParams, PostService } from "../services/PostService";





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

        await postService.uploadPostImages(request, response, parseInt(postId), imageLink)

        response.json({ message: "Images uploaded successfully" })

    }

    async postImages(request: Request, response: Response) {

        const { postId } = request.params;

        const postService = new PostService();
        const postImages = await postService.postImages(parseInt(postId));

        return response.json(postImages);

    }

    async getPosts(request: Request, response: Response) {

        const params: IGetPostsParams = {
            longitude: request.query.longitude as string || "",
            latitude: request.query.latitude as string || "",
            locationRange: request.query.locationRange as string || "",
            category: request.query.category as string || "",
            text: request.query.text as string || "",
            page: request.query.page as string || "1",
            postQty: request.query.postQty as string || "10",
            sortPost: request.query.sortPost as string || "createdDate"
        }

        const postService = new PostService();

        const posts = await postService.getPosts(params);

        return response.json(posts);
    }

    async deletePost(request: Request, response: Response) {
        const { postId } = request.params;

        const postService = new PostService();
        const posts = await postService.deletePost(parseInt(postId));

        return response.json(posts);
    }


    async createPostCategory(request: Request, response: Response) {
        const  categoryName  = request.body.category;
        console.log(categoryName);
        
        const postService = new PostService();
        const category = await postService.createCategory(categoryName);

        return response.json(category);
    }

    async getPostCategories(request: Request, response: Response) {
        const postService = new PostService();
        const categories = await postService.getCategories();

        return response.json(categories);
    }
}