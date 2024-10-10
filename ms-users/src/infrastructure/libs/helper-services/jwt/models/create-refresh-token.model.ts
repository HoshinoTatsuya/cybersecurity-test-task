/**
 * Description of the current class
 *
 * @class CreateRefreshTokenModel
 *
 * @property {string} refreshToken is used for whatever reason
 * @property {number} refreshTokenExpire is used for whatever reason
 */
export class CreateRefreshTokenModel {
  public refreshToken: string
  public refreshTokenExpire: number

  /**
   *
   * @param {CreateRefreshTokenModel} data type is {@link CreateRefreshTokenModel}
   * @constructor
   */
  public constructor(data: CreateRefreshTokenModel) {
    this.refreshToken = data.refreshToken
    this.refreshTokenExpire = data.refreshTokenExpire
  }
}
