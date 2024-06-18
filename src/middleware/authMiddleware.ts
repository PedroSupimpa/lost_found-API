import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repository/userRepository";
import jwt from 'jsonwebtoken';

export const authMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    const token = request.cookies['token'];

    if (!token) {
        return response.status(401).json({ error: "Not authorized. No token provided." });
    }
    
    try {
        const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as { id: number };
        const user = await userRepository.findOne({ where: { id } });

        if (!user) {
            return response.status(401).json({ error: "Not authorized - User not found" });
        }

        const { password, ...loggedUser } = user;
        request.user = loggedUser;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return response.status(403).json({ error: "Invalid token." });
        } else if (error instanceof jwt.TokenExpiredError) {
            return response.status(401).json({ error: "Token has expired." });
        } else {
            return response.status(500).json({ error: "Failed to authenticate token." });
        }
    }
};
