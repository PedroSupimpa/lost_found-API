import multer from "multer";
import fs from "fs";
import { NextFunction, Request, Response } from "express";


export const imageUploadMiddleware = async (request: Request, response: Response, imageLinkId: string, next: NextFunction) => {

    const storage = multer.diskStorage({
        destination: function (req: any, file: any, cb: any) {
            const destinationPath = 'src/images';

            if (!fs.existsSync(destinationPath)) {
                fs.mkdirSync(destinationPath);
            }

            cb(null, destinationPath);
        },
        filename: function (req: any, file: any, cb: any) {
            cb(null, imageLinkId + '.jpg');
        }
    });

    const upload = multer({ storage: storage }).single('image');

    upload(request, response, function (error: any) {
        if (error) {
            return response.status(400).json({ message: error.message });
        }

        return response.json({ message: 'Image uploaded successfully' });
    });


    next();

}