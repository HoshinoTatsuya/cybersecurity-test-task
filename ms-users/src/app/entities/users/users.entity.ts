import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Role } from '../../../domain/enums'

import { BaseEntity } from '../base/base.entity'

@Entity({ name: UsersEntity.tableName })
export class UsersEntity extends BaseEntity {
  /** @description Название таблицы */
  public static tableName = 'users'

  private static _fields = {
    id: 'id',
    email: 'email',
    name: 'name',
    avatar: 'avatar',
    lastName: 'lastName',
    password: 'password',
    role: 'role',
    refreshToken: 'refreshToken',
  }

  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  public id: string

  @Column({ name: 'user_id', type: 'varchar', nullable: false, unique: false })
  public email: string

  @Column({ name: 'name', type: 'varchar', nullable: false })
  public name: string

  @Column({
    name: 'last_name',
    type: 'varchar',
    nullable: false,
  })
  public lastName: string

  @Column({
    name: 'avatar',
    type: 'varchar',
    nullable: true,
  })
  public avatar: string

  @Column({
    name: 'role',
    type: 'enum',
    enum: Role,
    nullable: false,
  })
  public role: Role

  @Column({
    name: 'refresh_token',
    type: 'varchar',
    nullable: true,
  })
  public refreshToken: string

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
      avatar: `${alias}.${UsersEntity._fields.avatar}`,
      password: `${alias}.${UsersEntity._fields.password}`,
      role: `${alias}.${UsersEntity._fields.role}`,
      refreshToken: `${alias}.${UsersEntity._fields.refreshToken}`,
    }
  }
}
