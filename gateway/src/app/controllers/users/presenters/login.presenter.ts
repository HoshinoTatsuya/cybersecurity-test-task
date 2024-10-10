import { ApiProperty } from '@nestjs/swagger'

export class LoginPresenter {
  @ApiProperty()
  public token: string

  public constructor(data: LoginPresenter) {
    this.token = data.token
  }
}
