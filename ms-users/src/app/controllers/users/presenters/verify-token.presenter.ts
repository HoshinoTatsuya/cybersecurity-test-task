import { Role } from '../../../../domain/enums'

export class VerifyTokenPresenter {
  public userId: string
  public role: Role

  public constructor(data: VerifyTokenPresenter) {
    this.userId = data.userId
    this.role = data.role
  }
}
