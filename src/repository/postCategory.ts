import { PostCategory } from './../entities/PostCategory';
import AppDataSource from "../data-source";


export const postCategoryRepository = AppDataSource.getRepository(PostCategory)