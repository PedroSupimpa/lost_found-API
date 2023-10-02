import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity('post_category')
export class PostCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    name: string;

}