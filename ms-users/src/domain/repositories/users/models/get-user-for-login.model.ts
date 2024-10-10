import { Role } from '../../../enums'

export class GetUserForLoginModel {
  public id: string
  public role: Role

  public constructor(data: GetUserForLoginModel) {
    this.id = data.id
    this.role = data.role
  }
}
