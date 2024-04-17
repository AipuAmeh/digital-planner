import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToEntity1713380462270 implements MigrationInterface {
    name = 'AddColumnToEntity1713380462270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "active"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" ADD "active" boolean NOT NULL DEFAULT false`);
    }

}
