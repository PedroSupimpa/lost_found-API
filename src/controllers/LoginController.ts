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
    
        return response.cookie('token', result.token, {
            httpOnly: true,
            secure: true,
            maxAge: 8 * 60 * 60 * 1000, 
            sameSite: 'none'
        }).status(200).json({ user: result.user });
    }

    async getAuthenticatedUser(request: Request, response: Response) {

        return response.status(200).json(request.user);
    }
}