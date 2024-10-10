/**
 * Description of the current class
 *
 * @class CreateAccessTokenNewVersionModel
 *
 * @property {string} accessToken is used for whatever reason
 * @property {number} accessTokenExpire is used for whatever reason
 */
export class CreateAccessTokenNewVersionModel {
  public accessToken: string
  public accessTokenExpire: number

  /**
   *
   * @param {CreateAccessTokenNewVersionModel} data type is {@link CreateAccessTokenNewVersionModel}
   * @constructor
   */
  public constructor(data: CreateAccessTokenNewVersionModel) {
    this.accessToken = data.accessToken
    this.accessTokenExpire = data.accessTokenExpire
  }
}
