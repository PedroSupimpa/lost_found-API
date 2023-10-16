import { Point } from "geojson";

import { postRepository } from "../repository/postRepository";
import { userRepository } from "../repository/userRepository";
import { PostCategory } from "../entities/PostCategory";
import { postCategoryRepository } from "../repository/postCategory";
import { postImageRepository } from "../repository/postImageRepository";
import { imageUploadMiddleware } from "../middleware/imageUploadMiddleware";
import { Request, Response, request, response } from "express";
import fs from "fs";



interface IPostRequest {
    title: string;
    description: string;
    category: PostCategory;
    location: Point;
    createdDate: Date;
    closedDate?: Date;
    createdByUser: number;
    images?: string[];
}


export class PostService {

    async create({ title, description, category, location, createdDate, createdByUser }: IPostRequest) {

        const user = await userRepository.findOne({ where: { id: createdByUser } });

        if (!user) throw new Error("User not found");

        const categorySelected = await postCategoryRepository.findOne({ where: { id: category.id } });

        if (!categorySelected) throw new Error("Category not found");

        const newPost = postRepository.create({
            title,
            description,
            location,
            category: { id: categorySelected.id, name: categorySelected.name },
            createdDate,
            createdByUser: { id: user.id }
        });

        await postRepository.save(newPost);

        return newPost;

    }


    async uploadPostImages(request: Request, response: Response, postId: number, imageLink: string) {
        const post = await postRepository.findOne({ where: { id: postId } });
        if (!post) throw new Error("Post not found");

        try {
            await new Promise((resolve, reject) => {
                imageUploadMiddleware(request, response, imageLink, function (error: any) {
                    if (error) {
                        reject(error);
                    }

                    const newPostImage = postImageRepository.create({
                        imageLink,
                        postId: post.id
                    });

                    postImageRepository.save(newPostImage);
                    resolve({ message: "Images uploaded successfully" });
                });
            });

            return { message: "Images uploaded successfully" };
        } catch (error) {
            throw error;
        }
    }


    async postImages(postId: number) {
        const post = await postRepository.findOne({ where: { id: postId } });
        if (!post) throw new Error("Post not found");

        const postImages = await postImageRepository.find({ where: { postId: postId } });

        postImages.forEach(postImage => {
            postImage.imageLink = `http://localhost:3000/user/images/${postImage.imageLink}.jpg`;
        });

        return postImages;
    }

    async getPosts(postId: number) {

        const posts = await postRepository.find({ where: { id: postId } });
        const postImages = await postImageRepository.find({ where: { postId: postId } });

        posts.forEach(post => {
            postImages.forEach(postImage => {
                postImage.imageLink = `http://localhost:3000/user/images/${postImage.imageLink}.jpg`;
            });
            post.images = postImages
        });

        return posts;

    }

    async deletePost(postId: number) {
        const post = await postRepository.findOne({ where: { id: postId } });
        const postImages = await postImageRepository.find({ where: { postId: postId } });

        if (!post) {
            throw new Error("Post not found");
        }
        try {

            await postImages.forEach(postImage => {
                const imageFilePath = `src/images/${postImage?.imageLink}.jpg`;
                fs.unlinkSync(imageFilePath);
            });
            await postImageRepository.remove(postImages);
            await postRepository.remove(post);
        } catch (error) {

            throw error;
        }

        return { message: "Post and associated postImages deleted successfully" };
    }


}