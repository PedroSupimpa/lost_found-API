import { Address } from './../entities/Address';

import { Request, Response } from 'express';
import { CreateUserService, UpdateUserAddressService, UpdateUserService } from '../services/CRUDUserService';



export class CreateUserController {

    async handle(request: Request, response: Response) {
        const { name, phone, email, password, address } = request.body;

        const service = new CreateUserService();

        const result = await service.execute({ name, phone, email, password, address });

        if (result instanceof Error) {
            return response.status(400).json({ error: result.message });
        }

        return response.status(201).json(result);

    }



}

export class UpdateUserController {

    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { name, phone, email, password } = request.body;

        const service = new UpdateUserService();

        const result = await service.execute({ id: parseInt(id), name, phone, email, password });

        if (result instanceof Error) {
            return response.status(400).json({ error: result.message });
        }

        return response.json(result);
    }

}


export class UpdateUserAddressController {

    async handle(request: Request, response: Response) {
        const { userId } = request.params;
        const address = request.body;

        const service = new UpdateUserAddressService();

        const result = await service.execute(parseInt(userId), address);

        if (result instanceof Error) {
            return response.status(400).json({ error: result.message });
        }

        return response.json(result);
    }

}