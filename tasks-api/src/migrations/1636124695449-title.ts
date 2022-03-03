import {MigrationInterface, QueryRunner} from "typeorm";

export class title1636124695449 implements MigrationInterface {
    name = 'title1636124695449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "tasks_history_id_seq" OWNED BY "tasks_history"."id"`);
        await queryRunner.query(`ALTER TABLE "tasks_history" ALTER COLUMN "id" SET DEFAULT nextval('"tasks_history_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "tasks_history" DROP CONSTRAINT "UQ_110c095ea806b9655fe5bb054f2"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks_history" ADD CONSTRAINT "UQ_110c095ea806b9655fe5bb054f2" UNIQUE ("title")`);
        await queryRunner.query(`ALTER TABLE "tasks_history" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "tasks_history_id_seq"`);
    }

}
