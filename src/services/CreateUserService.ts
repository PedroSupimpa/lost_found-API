import { User } from "../entities/User";
import { addressRepository } from "../repository/addressRepository";
import { userRepository } from "../repository/userRepository";

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

export class CreateUserService {
    async execute({ name, phone, email, password, address }: IUserRequest): Promise<User | Error> {




        const newUser = userRepository.create({
            name,
            phone,
            email,
            password,
        })

        await userRepository.save(newUser)

        const newAddress = addressRepository.create({
            userId: newUser.id,
            zipcode: address.zipcode,
            address: address.address,
            number: address.number,
        });

        await addressRepository.save(newAddress);


        newUser.address = newAddress;

        return newUser;

    }

}