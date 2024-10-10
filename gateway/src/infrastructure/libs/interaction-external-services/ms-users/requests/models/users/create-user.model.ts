import { Role } from '../../../../../../../domain/enums'

export class CreateUserModel {
  public id: string
  public email: string
  public name: string
  public lastName: string
  public role: Role
  public createdDate: Date
  public updatedDate?: Date
  public _metadata: string
  public _v: number

  public constructor(data: CreateUserModel) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.lastName = data.lastName
    this.role = data.role
    this.createdDate = data.createdDate
    this.updatedDate = data.updatedDate
    this._metadata = data._metadata
    this._v = data._v
  }
}
