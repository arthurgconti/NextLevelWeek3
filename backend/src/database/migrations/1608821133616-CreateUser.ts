import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1608821133616 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'email',
                    type: 'varchar'
                },
                {
                    name: 'password',
                    type: 'varchar'
                },
                {
                    name: 'passwordResetToken',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'passwordResetExpires',
                    type: 'Date',
                    isNullable: true
                },
                {
                    name: 'passwordTokenUsed',
                    type: 'boolean',
                    default: false,
                    isNullable: true
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
