/**
 * Description of the current class
 *
 * @class CreateAccessTokenOldVersionModel
 *
 * @property {string} accessToken is used for whatever reason
 * @property {number} accessTokenExpire is used for whatever reason
 */
export class CreateAccessTokenOldVersionModel {
  public accessToken: string
  public accessTokenExpire: number

  /**
   *
   * @param {CreateAccessTokenOldVersionModel} data type is {@link CreateAccessTokenOldVersionModel}
   * @constructor
   */
  public constructor(data: CreateAccessTokenOldVersionModel) {
    this.accessToken = data.accessToken
    this.accessTokenExpire = data.accessTokenExpire
  }
}
