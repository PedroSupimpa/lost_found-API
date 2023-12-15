import { Address } from './../entities/Address';
import { User } from "../entities/User";
import { addressRepository } from "../repository/addressRepository";
import { userRepository } from "../repository/userRepository";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: "email",
        pass: "password",
    },

})

interface IUserRequest {
    name: string;
    phone: string;
    email: string;
    password: string;
    address: {
        zipcode: string;
        address: string;
        number: string;
    };
}



export class CRUDUserService {
    async create({ name, phone, email, password, address }: IUserRequest): Promise<User | Error> {

        const hashPassword = await bcrypt.hash(password, 10);



        const newUser = userRepository.create({
            name,
            phone,
            email,
            password: hashPassword,
        })

        await userRepository.save(newUser)

        const newAddress = addressRepository.create({
            userId: newUser.id,
            zipcode: address.zipcode,
            address: address.address,
            number: address.number,
        });



        newUser.address = newAddress;
        await addressRepository.save(newAddress);





        return newUser;
    }

    async emailConfirmation(to: string, subject: string, text: string) {
        transporter.sendMail({
            from: to,
            to: "pedrosupimpa@gmail.com",
            subject: subject,
            text: text,
        })

        if (to === "") {
            return new Error("Email not found");
        }

    }


    async update({ id, name, phone, email, password }: Omit<User, "address" | "updatedUser">) {

        const updatedUser = await userRepository.findOne({ where: { id } });

        if (!updatedUser) {
            return new Error("User not found");
        }

        updatedUser.name = name ? name : updatedUser.name;
        updatedUser.phone = phone ? phone : updatedUser.phone;
        updatedUser.email = email ? email : updatedUser.email;
        updatedUser.password = password ? password : updatedUser.password;



        await userRepository.save(updatedUser);

        return updatedUser;
    }

    async updatePassword(id: number, updatePassword: { oldPassword: string, newPassword: string }) {

        const updatedUserPassword = await userRepository.findOne({ where: { id } });

        if (!updatedUserPassword) {
            return new Error("User not found");
        }

        if (!(await bcrypt.compare(updatePassword.oldPassword, updatedUserPassword.password))) {

            return new Error("Incorrect old password");

        }
        if (updatePassword.oldPassword === updatePassword.newPassword) {
            return new Error("The new password cannot be the same as the old password");
        }

        const newPasswordHash = await bcrypt.hash(updatePassword.newPassword, 10);

        updatedUserPassword.password = newPasswordHash;



        await userRepository.save(updatedUserPassword);
        return updatedUserPassword;

    }



    async updateAddress(userId: number, address: Address) {

        const updatedAddress = await addressRepository.findOne({ where: { userId } });

        if (!updatedAddress) {
            return new Error("User not found");
        }

        updatedAddress.zipcode = address.zipcode ? address.zipcode : updatedAddress.zipcode;
        updatedAddress.address = address.address ? address.address : updatedAddress.address;
        updatedAddress.number = address.number ? address.number : updatedAddress.number;
        updatedAddress.observation = address.observation ? address.observation : updatedAddress.observation;

        await addressRepository.save(updatedAddress);

        return updatedAddress;
    }
}

