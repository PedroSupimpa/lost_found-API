import { Address } from './../entities/Address';
import { User } from "../entities/User";
import { addressRepository } from "../repository/addressRepository";
import { userRepository } from "../repository/userRepository";
import bcrypt from "bcrypt";

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

