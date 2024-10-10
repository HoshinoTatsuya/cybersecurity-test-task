import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateCategory1726411105171 implements MigrationInterface {
  public name = 'CreateCategory1726411105171'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createDatabase(`ms-comments`, true)

    await queryRunner.createTable(
      new Table({
        name: 'comments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
          },

          {
            name: 'created_date',
            type: 'timestamp',
            isNullable: false,
            default: `now()`,
          },
          {
            name: 'updated_date',
            type: 'timestamp',
            default: `now()`,
          },
          {
            name: 'deleted_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
            isUnique: false,
          },
          {
            name: 'text',
            type: 'character varying',
            isNullable: false,
            isUnique: false,
          },
          {
            name: 'automaticDeletionDate',
            type: 'int',
            isNullable: true,
            isUnique: false,
          },
          {
            name: '_metadata',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: '_v',
            type: 'int2',
            default: 1,
            isNullable: false,
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "comments"`)
  }
}
