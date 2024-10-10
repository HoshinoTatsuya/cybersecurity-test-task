import { BasePresenter } from './base.presenter'

export class BaseUserPresenter extends BasePresenter {
  public id: string
  public email: string
  public name: string
  public lastName: string

  public constructor(data: BaseUserPresenter) {
    super(data)
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.lastName = data.lastName
  }
}
