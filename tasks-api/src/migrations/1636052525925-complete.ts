import {MigrationInterface, QueryRunner} from "typeorm";

export class complete1636052525925 implements MigrationInterface {
    name = 'complete1636052525925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks_history" ADD "complete" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks_history" DROP COLUMN "complete"`);
    }

}
