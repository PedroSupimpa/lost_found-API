import { userRepository } from "../repository/userRepository";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


interface ILoginRequest {
    email: string;
    password: string;
}

export class LoginService {

    async login({ email, password }: ILoginRequest) {

        const user = await userRepository.findOne({ where: { email } });

        if (!user) {
            return new Error("User not found");
        }

        const verifyPassword = await bcrypt.compare(password, user.password);

        if (!verifyPassword) {
            return new Error("Incorrect password");
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', { expiresIn: '8h' });

        const { password: pass, ...userLogin } = user;

        return {
            user: userLogin,
            token: token
        };


    }

    async getAuthenticatedUser(authorization: string) {



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

        return loggedUser;


    }

}