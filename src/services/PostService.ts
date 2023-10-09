import { Point } from "geojson";

import { postRepository } from "../repository/postRepository";
import { userRepository } from "../repository/userRepository";
import { PostCategory } from "../entities/PostCategory";
import { postCategoryRepository } from "../repository/postCategory";



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




    async uploadPostImages(postId: number, images: string[]) {

        const post = await postRepository.findOne({ where: { id: postId } });

        if (!post) throw new Error("Post not found");








    }

}