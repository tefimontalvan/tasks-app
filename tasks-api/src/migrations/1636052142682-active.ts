import {MigrationInterface, QueryRunner} from "typeorm";

export class active1636052142682 implements MigrationInterface {
    name = 'active1636052142682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks_history" ADD "active" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks_history" DROP COLUMN "active"`);
    }

}
