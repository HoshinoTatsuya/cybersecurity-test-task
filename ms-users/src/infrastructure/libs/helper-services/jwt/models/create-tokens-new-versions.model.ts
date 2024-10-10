/**
 * Description of the current class
 *
 * @class CreateTokensNewVersionsModel
 *
 * @property {string} accessToken is used for whatever reason
 * @property {string} refreshToken is used for whatever reason
 * @property {number} refreshTokenExpire is used for whatever reason
 * @property {number} accessTokenExpire is used for whatever reason
 */
export class CreateTokensNewVersionsModel {
  public accessToken: string
  public refreshToken: string
  public refreshTokenExpire: number
  public accessTokenExpire: number

  /**
   *
   * @param {CreateTokensNewVersionsModel} data type is {@link CreateTokensNewVersionsModel}
   * @constructor
   */
  public constructor(data: CreateTokensNewVersionsModel) {
    this.accessToken = data.accessToken
    this.refreshToken = data.refreshToken
    this.refreshTokenExpire = data.refreshTokenExpire
    this.accessTokenExpire = data.accessTokenExpire
  }
}
