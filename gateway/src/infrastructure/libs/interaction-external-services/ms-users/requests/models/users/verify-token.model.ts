import { Role } from '../../../../../../../domain/enums'

export class VerifyTokenModel {
  public userId: string
  public role: Role

  public constructor(data: VerifyTokenModel) {
    this.userId = data.userId
    this.role = data.role
  }
}
