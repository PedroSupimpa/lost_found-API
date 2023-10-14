import express from 'express';
import AppDataSource from './data-source';
import routes from './routes';
import path from 'path';
import fs from 'fs';
require('dotenv').config();


AppDataSource.initialize().then(() => {
    const app = express();

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
    return app.listen(process.env.PORT)

})