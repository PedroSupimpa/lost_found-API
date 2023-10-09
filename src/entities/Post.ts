
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { PostCategory } from "./PostCategory";
import { Point } from "geojson"
import { PostImage } from "./PostImage";
@Entity('post')
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false, type: 'point' })
    location: Point;

    @Column({ nullable: false })
    createdDate: Date;

    @Column()
    closedDate: Date;

    @ManyToOne(type => User, user => user.id, { nullable: false })
    createdByUser: User;

    @ManyToOne(type => PostCategory, postCategory => postCategory.id, { nullable: false })
    category: PostCategory;

    @OneToMany(type => PostImage, postImage => postImage.postId)
    images: PostImage[];

}
