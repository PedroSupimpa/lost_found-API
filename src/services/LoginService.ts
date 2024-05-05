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
            return new Error("Invalid password");
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', { expiresIn: '8h' });

        const { password: pass, ...userLogin } = user;

        return {
            user: userLogin,
            token: token
        };
    }
}