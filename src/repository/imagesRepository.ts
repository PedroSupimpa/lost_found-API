import { PostImage } from './../entities/PostImage';
import AppDataSource from "../data-source";


export const imagesRepository = AppDataSource.getRepository(PostImage)