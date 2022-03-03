import {MigrationInterface, QueryRunner} from "typeorm";

export class taskhistory1635698276544 implements MigrationInterface {
    name = 'taskhistory1635698276544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tasks_history" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "taskId" integer NOT NULL, CONSTRAINT "UQ_110c095ea806b9655fe5bb054f2" UNIQUE ("title"), CONSTRAINT "PK_9b4ec987a89d50b58a582c31f21" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tasks_history" ADD CONSTRAINT "FK_95c5208a41b0e3f6aacf2ec2bae" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks_history" DROP CONSTRAINT "FK_95c5208a41b0e3f6aacf2ec2bae"`);
        await queryRunner.query(`DROP TABLE "tasks_history"`);
    }

}
