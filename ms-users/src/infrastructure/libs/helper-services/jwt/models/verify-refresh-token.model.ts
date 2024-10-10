/**
 * Description of the current class
 *
 * @class VerifyRefreshTokenModel
 *
 * @property {Record<string, unknown>} refreshTokenData is used for whatever reason
 */
export class VerifyRefreshTokenModel<OutputData extends Record<string, unknown>> {
  public refreshTokenData: OutputData

  /**
   *
   * @param {VerifyRefreshTokenModel} data type is {@link VerifyRefreshTokenModel}
   * @constructor
   */
  public constructor(data: VerifyRefreshTokenModel<OutputData>) {
    this.refreshTokenData = data.refreshTokenData
  }
}
