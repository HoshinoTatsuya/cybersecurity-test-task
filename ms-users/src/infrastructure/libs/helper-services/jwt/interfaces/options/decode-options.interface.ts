import * as jwt from 'jsonwebtoken'

/**
 * This is the description of the interface
 *
 * @interface IDecodeOptions
 * @property {boolean} [complete = undefined] is used for whatever reason
 * @property {boolean} [json = undefined] is used for whatever reason
 */
export interface IDecodeOptions extends jwt.DecodeOptions {}
