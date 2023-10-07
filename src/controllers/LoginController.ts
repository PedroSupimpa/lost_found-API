import { Request, Response } from "express";
import { LoginService } from "../services/LoginService";




export class LoginController {
    async login(request: Request, response: Response) {
        const { email, password } = request.body;



        const service = new LoginService();

        const result = await service.login({ email, password });

        if (result instanceof Error) {
            return response.status(400).json({ error: result.message });
        }




        return response.status(200).json(result);
    }

    async getAuthenticatedUser(request: Request, response: Response) {

        const { authorization } = request.headers;

        const service = new LoginService();

        const result = await service.getAuthenticatedUser(authorization ?? '');


        if (result instanceof Error) {
            return response.status(400).json({ error: result.message });
        }

        return response.status(200).json(result);
    }
}