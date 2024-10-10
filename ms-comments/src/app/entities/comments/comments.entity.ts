/* eslint-disable import/no-cycle */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { BaseEntity } from '../base/base.entity'

@Entity({ name: CommentsEntity.tableName })
export class CommentsEntity extends BaseEntity {
  /** @description Название таблицы */
  public static tableName = 'comments'

  private static _fields = {
    id: 'id',
    userId: 'userId',
    text: 'text',
    automaticDeletionDate: 'automaticDeletionDate',
  }

  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({ name: 'user_id', type: 'uuid', nullable: false, unique: false })
  public userId: string

  @Column({ name: 'text', type: 'varchar', nullable: false })
  public text: string

  @Column({
    name: 'automatic_deletion_date',
    type: 'int',
    nullable: true,
  })
  public automaticDeletionDate: number

  public static getFieldsName(alias: string = CommentsEntity.tableName): Record<keyof CommentsEntity, string> {
    return {
      ...BaseEntity.getBaseFieldsName(alias),
      id: `${alias}.${CommentsEntity._fields.id}`,
      userId: `${alias}.${CommentsEntity._fields.userId}`,
      text: `${alias}.${CommentsEntity._fields.text}`,
      automaticDeletionDate: `${alias}.${CommentsEntity._fields.automaticDeletionDate}`,
    }
  }
}
