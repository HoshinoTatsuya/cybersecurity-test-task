import { PayloadTokenModel } from './payload-token.model'

/**
 * Description of the current class
 *
 * @class DecodeRefreshTokenModel
 *
 * @property {Record<string, unknown> & PayloadTokenModel} refreshTokenData is used for whatever reason
 */
export class DecodeRefreshTokenModel<OutputData extends Record<string, unknown> & PayloadTokenModel> {
  public refreshTokenData: OutputData

  /**
   *
   * @param {Partial<DecodeRefreshTokenModel>} partial type is {@link DecodeRefreshTokenModel}
   * @constructor
   */
  public constructor(partial: Partial<DecodeRefreshTokenModel<OutputData> & PayloadTokenModel>) {
    const defaultData = new PayloadTokenModel(partial)
    this.refreshTokenData = { ...partial.refreshTokenData, ...defaultData }
  }
}
