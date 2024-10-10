import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm'

export class BaseEntity {
  private static _baseFields = {
    _metadata: '_metadata',
    _v: '_v',
    createdDate: 'createdDate',
    updatedDate: 'updatedDate',
    deletedDate: 'deletedDate',
  }

  @CreateDateColumn({ name: 'created_date', type: 'timestamp', nullable: false })
  public createdDate: Date

  @UpdateDateColumn({ name: 'updated_date', type: 'timestamp', nullable: true })
  public updatedDate?: Date

  @DeleteDateColumn({ name: 'deleted_date', type: 'timestamp', nullable: true })
  public deletedDate?: Date

  @Column({ name: '_metadata', type: 'jsonb', nullable: true })
  public _metadata: string

  @VersionColumn({ name: '_v', type: 'int2', default: 1, nullable: false })
  public _v: number

  protected static get getAllBaseFieldsName(): Record<keyof BaseEntity, string> {
    return BaseEntity._baseFields
  }

  protected static getBaseFieldsName(alias: string): Record<keyof BaseEntity, string> {
    return {
      _metadata: `${alias}.${BaseEntity._baseFields._metadata}`,
      _v: `${alias}.${BaseEntity._baseFields._v}`,
      createdDate: `${alias}.${BaseEntity._baseFields.createdDate}`,
      updatedDate: `${alias}.${BaseEntity._baseFields.updatedDate}`,
      deletedDate: `${alias}.${BaseEntity._baseFields.deletedDate}`,
    }
  }
}
