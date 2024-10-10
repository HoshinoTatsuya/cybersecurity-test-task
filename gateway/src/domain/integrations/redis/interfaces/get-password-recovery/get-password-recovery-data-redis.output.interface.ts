/**
 * This is the description of the interface
 *
 * @interface IGetPasswordRecoveryDataRedisOutput
 * @property {string} code is used for whatever reason
 */
export interface IGetPasswordRecoveryDataRedisOutput {
  code: string
  accepted: boolean
  timeRequest: number
  expiresTime: number
}
