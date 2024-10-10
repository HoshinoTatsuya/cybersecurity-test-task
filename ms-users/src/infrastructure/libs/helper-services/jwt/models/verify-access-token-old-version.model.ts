/**
 * Description of the current class
 *
 * @class VerifyAccessTokenOldVersionModel
 *
 * @property {Record<string, unknown>} accessTokenData is used for whatever reason
 */
export class VerifyAccessTokenOldVersionModel<OutputData extends Record<string, unknown>> {
  public accessTokenData: OutputData

  /**
   *
   * @param {VerifyAccessTokenOldVersionModel} data type is {@link VerifyAccessTokenOldVersionModel}
   * @constructor
   */
  public constructor(data: VerifyAccessTokenOldVersionModel<OutputData>) {
    this.accessTokenData = data.accessTokenData
  }
}
