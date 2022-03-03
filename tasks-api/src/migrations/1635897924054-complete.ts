import {MigrationInterface, QueryRunner} from "typeorm";

export class complete1635897924054 implements MigrationInterface {
    name = 'complete1635897924054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "complete" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "complete"`);
    }

}
