export class GetRefreshTokenModel {
  public token: string

  public constructor(data: GetRefreshTokenModel) {
    this.token = data.token
  }
}
