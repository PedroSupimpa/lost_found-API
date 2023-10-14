
import AppDataSource from "../data-source";
import { PostImage } from '../entities/PostImage';


export const postImageRepository = AppDataSource.getRepository(PostImage)