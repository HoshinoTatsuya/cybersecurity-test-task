import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { BaseEntity } from '../base/base.entity'

@Entity({ name: UsersEntity.tableName })
export class UsersEntity extends BaseEntity {
  /** @description Название таблицы */
  public static tableName = 'users'

  private static _fields = {
    id: 'id',
    email: 'email',
    name: 'name',
    lastName: 'lastName',
    password: 'password',
  }

  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({ name: 'user_id', type: 'uuid', nullable: false, unique: false })
  public email: string

  @Column({ name: 'text', type: 'varchar', nullable: false })
  public name: string

  @Column({
    name: 'last_name',
    type: 'varchar',
    nullable: false,
  })
  public lastName: string

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false,
  })
  public password: string

  public static getFieldsName(alias: string = UsersEntity.tableName): Record<keyof UsersEntity, string> {
    return {
      ...BaseEntity.getBaseFieldsName(alias),
      id: `${alias}.${UsersEntity._fields.id}`,
      email: `${alias}.${UsersEntity._fields.email}`,
      name: `${alias}.${UsersEntity._fields.name}`,
      lastName: `${alias}.${UsersEntity._fields.lastName}`,
      password: `${alias}.${UsersEntity._fields.password}`,
    }
  }
}
