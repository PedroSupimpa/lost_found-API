import multer from "multer";
import fs from "fs";
import { Request, Response } from "express";


export const imageUpload = async (request: Request, response: Response, imageLinkId: string) => {
    return new Promise<void>((resolve, reject) => {

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
                reject({ message: error.message });
            }

            resolve()
        });
    });

}