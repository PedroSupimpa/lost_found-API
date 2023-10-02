
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity('post_image')
export class PostImage {

    @Column({ type: 'uuid', nullable: false, primary: true })
    imageLink: string;

    @Column({ nullable: false, primary: true })
    postId: number;


}


