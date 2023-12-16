import { CRUDUserService } from '../services/CRUDUserService';
import { Request, Response } from 'express';




export class CRUDUserController {

    async create(request: Request, response: Response) {
        const { name, phone, email, password, address } = request.body;

        const service = new CRUDUserService();

        const result = await service.create({ name, phone, email, password, address });

        if (result instanceof Error) {
            return response.status(400).json({ error: result.message });
        }
        const { password: pass, ...user } = result;

        return response.status(201).json(user);

    }


    async emailConfirmation(request: Request, response: Response) {

        const { email, subject, text } = request.body;

        const service = new CRUDUserService();

        const result = await service.emailConfirmation(email, subject, text);

        if (result instanceof Error) {
            return response.status(400).json({ error: result.message });
        }


        return response.status(201).json("Email sent successfully");

    }



    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { name, phone, email, password } = request.body;

        const service = new CRUDUserService();

        const result = await service.update({ id: parseInt(id), name, phone, email, password });

        if (result instanceof Error) {
            return response.status(400).json({ error: result.message });
        }

        return response.json(result);
    }

    async updatePassword(request: Request, response: Response) {

        const { id } = request.params;
        const updatePassword = request.body;


        const service = new CRUDUserService();

        const result = await service.updatePassword(parseInt(id), updatePassword);

        if (result instanceof Error) {
            return response.status(400).json({ error: result.message });
        }

        return response.json("Password updated successfully");

    }




    async updateAddress(request: Request, response: Response) {
        const { userId } = request.params;
        const address = request.body;

        const service = new CRUDUserService();

        const result = await service.updateAddress(parseInt(userId), address);

        if (result instanceof Error) {
            return response.status(400).json({ error: result.message });
        }

        return response.json(result);
    }

}