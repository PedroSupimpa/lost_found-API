import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repository/userRepository";
import jwt from 'jsonwebtoken';

export const authMiddleware = async (request: Request, response: Response, next: NextFunction) => {

    const { authorization } = request.headers;
    if (!authorization) {
        return new Error("Not authorized");
    }

    const token = authorization.split(' ')[1];

    const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as { id: number };

    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
        return new Error("Not authorized");
    }

    const { password: pass, ...loggedUser } = user;

    request.user = loggedUser;

    next();

}