import { Entity, Column, PrimaryColumn } from "typeorm";
@Entity('address')
export class Address {

    @PrimaryColumn({ nullable: false, unique: true })
    userId: number;

    @Column({ nullable: false })
    zipcode: string;

    @Column({ nullable: false })
    address: string;

    @Column({ nullable: false })
    number: string;

    @Column({ nullable: true })
    observation: string;
}