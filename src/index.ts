import cookieParser from 'cookie-parser';
import express from 'express';
import fs from 'fs';
import path from 'path';
import AppDataSource from './data-source';
import routes from './routes';
const cors = require('cors')
require('dotenv').config();


const corsOptions = {
    origin: 'https://lostandfound-ophx.onrender.com',
    credentials: true, 
};



AppDataSource.initialize().then(() => {
    const app = express();
    app.use(cors(corsOptions));
    app.use(cookieParser());

    app.use(express.json());

    app.use(routes)

    app.get('/user/images/:imageFileName', (req, res) => {
        const imageFileName = req.params.imageFileName;
        const imagePath = path.join(__dirname, '/images', imageFileName);


        if (fs.existsSync(imagePath)) {
            res.sendFile(imagePath);
        } else {
            res.status(404).send('Imagem não encontrada');
        }
    });

    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });
    


    return app.listen(process.env.PORT)

})