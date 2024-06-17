import { Point } from "geojson";

import { Request, Response } from "express";
import fs from "fs";
import { ILike } from "typeorm";
import { Post } from "../entities/Post";
import { PostCategory } from "../entities/PostCategory";
import { postCategoryRepository } from "../repository/postCategory";
import { postImageRepository } from "../repository/postImageRepository";
import { postRepository } from "../repository/postRepository";
import { userRepository } from "../repository/userRepository";




interface IPostRequest {
    title: string;
    description: string;
    category: PostCategory;
    location: Point;
    createdDate: Date;
    closedDate?: Date;
    createdByUser: number;
    images?: {
        imageLink: string;
        postId: number;
    }[];
    
}

export interface IGetPostsParams {
    longitude: string;
    latitude: string;
    locationRange: string;
    category: string;
    text: string;
    page: string;
    postQty: string;
    sortPost: string;
}


const url= "lost-found-api-d361.onrender.com";
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


    async saveImageLink(request: Request, response: Response, postId: number, imageLink: string) {
        const post = await postRepository.findOne({ where: { id: postId } });
        if (!post) throw new Error("Post not found");

        try {

            const newPostImage = postImageRepository.create({
                imageLink,
                postId: post.id
            });

            postImageRepository.save(newPostImage);

        } catch (error) {
            throw error;
        }
    }

    async postImages(postId: number) {
        const post = await postRepository.findOne({ where: { id: postId } });
        if (!post) throw new Error("Post not found");

        const postImages = await postImageRepository.find({ where: { postId: postId } });

        postImages.forEach(postImage => {
            postImage.imageLink = `http://${url}/user/images/${postImage.imageLink}.jpg`;
        });

        return postImages;
    }


    async getPosts(params: IGetPostsParams) {
        try {
            const query: any = {};

            if (params.category) {
                query.category = { id: parseInt(params.category) };
            }

            if (params.text) {
                query.title = ILike(`%${params.text}%`);
            }

            const page = params.page ? parseInt(params.page.toString(), 10) : 1;
            const postQty = params.postQty ? parseInt(params.postQty.toString(), 10) : 10;
            const sortPost = params.sortPost ? params.sortPost : 'createdDate';

            let posts : Post[];
            let totalPosts: number;

            if (params.latitude && params.longitude && params.locationRange) {
 
                const radiusInDegrees = parseFloat(params.locationRange) / 111000;
                const locationQuery = `circle(point( :latitude,:longitude), :radius) @> location`;
    
                posts = await postRepository.createQueryBuilder("post")
                    .leftJoinAndSelect("post.category", "category")
                    .where(query)
                    .andWhere(locationQuery, {
                        longitude: params.longitude,
                        latitude: params.latitude,
                        radius: radiusInDegrees
                    })
                    .skip((page - 1) * postQty)
                    .take(postQty)
                    .orderBy(`post.${sortPost}`, 'DESC')
                    .getMany();
    
                totalPosts = await postRepository.createQueryBuilder("post")
                    .where(query)
                    .andWhere(locationQuery, {
                        longitude: params.longitude,
                        latitude: params.latitude,
                        radius: radiusInDegrees
                    })
                    .getCount();
            } else {
                posts = await postRepository.find({
                    relations: ["category"],
                    where: query,
                    skip: (page - 1) * postQty,
                    take: postQty,
                    order: { [sortPost]: 'DESC' }
                });
    
                totalPosts = await postRepository.count({ where: query });
            }
        
            
            const totalPages = Math.ceil(totalPosts / postQty);
            
            await Promise.all(posts.map(async post => {
                if (post.category) { 
                    const category = await postCategoryRepository.findOne({ where: { id: post.category.id } });
                    if (category) {
                        post.category = category;
                    }
                }
        
                const postImages = await postImageRepository.find({ where: { postId: post.id } });
                post.images = postImages.map(postImage => ({
                    imageLink: postImage.imageLink,
                    postId: post.id 
                }));
                return post;
            }));
        
            return { posts, totalPages };
        } catch (error) {
            throw error;
        }
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

    async createCategory(name: string) {

        if (!name) return new Error("Category name is required");

        if (await postCategoryRepository.findOne({ where: { name } })) {
            return new Error("Category already exists");
        }

        const category = postCategoryRepository.create({
            name
        });

        await postCategoryRepository.save(category);

        return category;
    }

    async getCategories() {
        const categories = await postCategoryRepository.find();
        return categories;
    }


}