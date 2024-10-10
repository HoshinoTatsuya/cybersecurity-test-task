import { BaseModel } from './base.model'

export class BaseUserModel extends BaseModel {
  public id: string
  public email: string
  public name: string
  public lastName: string

  public constructor(data: BaseUserModel) {
    super(data)
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.lastName = data.lastName
  }
}
