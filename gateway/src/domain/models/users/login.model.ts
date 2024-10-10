export class LoginModel {
  public token: string

  public constructor(data: LoginModel) {
    this.token = data.token
  }
}
