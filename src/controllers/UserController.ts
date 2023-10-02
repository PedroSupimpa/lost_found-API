
import { Request, Response } from 'express';
import { userRepository } from '../repository/userRepository';
import { addressRepository } from '../repository/addressRepository';



export class UserController {

    async create(req: Request, res: Response) {


        const { name, phone, email, password, address } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required' })
        }

        try {




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






            return res.status(201).json(newUser)

        }
        catch (err) {
            console.log(err, "deu ruim");
            return res.status(500).json({ message: 'Error creating user' })

        }

    }

}