import { Address } from './Address';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false, unique: true })
    phone: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    password: string;



    @OneToOne(type => Address, address => address.userId, { nullable: false })
    address: Address;
    updatedUser: { zipcode: string; address: string; number: string; };


}
