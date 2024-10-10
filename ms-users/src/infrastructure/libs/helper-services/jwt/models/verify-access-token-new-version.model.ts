/**
 * Description of the current class
 *
 * @class VerifyAccessTokenNewVersionModel
 *
 * @property {Record<string, unknown>} accessTokenData is used for whatever reason
 */
export class VerifyAccessTokenNewVersionModel<OutputData extends Record<string, unknown>> {
  public accessTokenData: OutputData

  /**
   *
   * @param {VerifyAccessTokenNewVersionModel} data type is {@link VerifyAccessTokenNewVersionModel}
   * @constructor
   */
  public constructor(data: VerifyAccessTokenNewVersionModel<OutputData>) {
    this.accessTokenData = data.accessTokenData
  }
}
