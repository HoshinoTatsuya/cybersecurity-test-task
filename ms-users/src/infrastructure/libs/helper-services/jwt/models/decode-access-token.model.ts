import { PayloadTokenModel } from './payload-token.model'

/**
 * Description of the current class
 *
 * @class DecodeAccessTokenModel
 *
 * @property {Record<string, unknown> & PayloadTokenModel} accessTokenData is used for whatever reason
 */
export class DecodeAccessTokenModel<OutputData extends Record<string, unknown> & PayloadTokenModel> {
  public accessTokenData: OutputData

  /**
   *
   * @param {Partial<DecodeAccessTokenModel>} partial type is {@link DecodeAccessTokenModel}
   * @constructor
   */
  public constructor(partial: Partial<DecodeAccessTokenModel<OutputData> & PayloadTokenModel>) {
    const defaultData = new PayloadTokenModel(partial)
    this.accessTokenData = { ...partial.accessTokenData, ...defaultData }
  }
}
