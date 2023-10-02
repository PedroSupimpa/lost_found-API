import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity('address')
export class Address {

    @PrimaryGeneratedColumn()
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