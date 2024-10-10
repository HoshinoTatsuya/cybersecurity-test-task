/**
 * Description of the current class
 *
 * @class PayloadTokenModel
 *
 * @property {number} iat is used for whatever reason
 * @property {number} exp is used for whatever reason
 */
export class PayloadTokenModel {
  public iat: number
  public exp: number

  /**
   *
   * @param {Partial<PayloadTokenModel>} partial type is {@link PayloadTokenModel}
   * @constructor
   */
  public constructor(partial: Partial<PayloadTokenModel>) {
    this.iat = partial.iat
    this.exp = partial.exp
  }
}
