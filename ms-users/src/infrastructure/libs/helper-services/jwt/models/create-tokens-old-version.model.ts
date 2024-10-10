/**
 * Description of the current class
 *
 * @class CreateTokensOldVersionModel
 *
 * @property {string} accessToken is used for whatever reason
 * @property {string} refreshToken is used for whatever reason
 * @property {number} refreshTokenExpire is used for whatever reason
 * @property {number} accessTokenExpire is used for whatever reason
 */
export class CreateTokensOldVersionModel {
  public accessToken: string
  public refreshToken: string
  public accessTokenExpire: number
  public refreshTokenExpire: number

  /**
   *
   * @param {CreateTokensOldVersionModel} data type is {@link CreateTokensOldVersionModel}
   * @constructor
   */
  public constructor(data: CreateTokensOldVersionModel) {
    this.accessToken = data.accessToken
    this.refreshToken = data.refreshToken
    this.accessTokenExpire = data.accessTokenExpire
    this.refreshTokenExpire = data.refreshTokenExpire
  }
}
