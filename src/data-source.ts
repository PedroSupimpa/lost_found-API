import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from "typeorm"


const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL, 
    entities: [
        `${__dirname}/**/entities/*.{ts,js}`
    ],
    migrations: [
        `${__dirname}/**/migrations/*.{ts,js}`
    ],
});

export default AppDataSource;
