import {MigrationInterface, QueryRunner} from "typeorm";

export class active1635889559212 implements MigrationInterface {
    name = 'active1635889559212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "active" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "active"`);
    }

}
