import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeImageLinkToText1623239012301 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_image" ALTER COLUMN "imageLink" TYPE text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_image" ALTER COLUMN "imageLink" TYPE uuid`);
    }
}
