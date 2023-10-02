import AppDataSource from "../data-source";
import { Address } from "../entities/Address";


export const addressRepository = AppDataSource.getRepository(Address)