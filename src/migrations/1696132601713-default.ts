import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1696132601713 implements MigrationInterface {
    name = 'Default1696132601713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("userId" SERIAL NOT NULL , "zipcode" character varying NOT NULL, "address" character varying NOT NULL, "number" character varying NOT NULL, "observation" character varying,CONSTRAINT "UQ_addressUserId" UNIQUE ("userId") , CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL, "fromUserId" integer NOT NULL, "toUserId" integer NOT NULL, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post_category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_83f78d22e3e01c0fc9af0cd5a25" UNIQUE ("name"), CONSTRAINT "PK_388636ba602c312da6026dc9dbc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post_image" ("imageLink" uuid NOT NULL, "postId" integer NOT NULL, CONSTRAINT "PK_1ff9bfa3c9dacdfc466c53930c4" PRIMARY KEY ("imageLink", "postId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "location" point NOT NULL, "createdDate" TIMESTAMP NOT NULL, "closedDate" TIMESTAMP, "createdByUserId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_ec4ec378a6d3a3007db2eddb398" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_1077d47e0112cad3c16bbcea6cd" FOREIGN KEY ("categoryId") REFERENCES "post_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_messageCreateById" FOREIGN KEY ("fromUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_messageReceivedById" FOREIGN KEY ("toUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_image" ADD CONSTRAINT "FK_postImagePostId" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_addressUserId" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_1077d47e0112cad3c16bbcea6cd"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_ec4ec378a6d3a3007db2eddb398"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_messageCreateById"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_messageReceivedById"`);
        await queryRunner.query(`ALTER TABLE "post_image" DROP CONSTRAINT "FK_postImagePostId"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_addressUserId"`);
        await queryRunner.query(`DROP TABLE "post_image"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "post_category"`);
        await queryRunner.query(`DROP TABLE "address"`);



    }

}


