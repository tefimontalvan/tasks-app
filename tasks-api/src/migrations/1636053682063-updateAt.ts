import {MigrationInterface, QueryRunner} from "typeorm";

export class updateAt1636053682063 implements MigrationInterface {
    name = 'updateAt1636053682063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks_history" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks_history" DROP COLUMN "updated_at"`);
    }

}
