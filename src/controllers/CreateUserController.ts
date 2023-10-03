
import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';



export class CreateUserController {

    async handle(request: Request, response: Response) {
        const { name, phone, email, password, address } = request.body;

        const service = new CreateUserService();

        const result = await service.execute({ name, phone, email, password, address });

        if (result instanceof Error) {
            return response.status(400).json({ error: result.message });
        }
    }

}