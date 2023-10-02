import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity('messages')
export class Messages {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    text: string;

    @Column({ nullable: false })
    timestamp: Date;

    @Column({ nullable: false })
    fromUserId: number;

    @Column({ nullable: false })
    toUserId: number;


}