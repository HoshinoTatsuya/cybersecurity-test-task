/**
 * This is the description of the interface
 *
 * @interface IGetAcceptedEmailRecoveryDataRedisOutput
 * @property {string} code is used for whatever reason
 */
export interface IGetAcceptedEmailRecoveryDataRedisOutput {
  code: string
  accepted: boolean
  timeRequest: number
  expiresTime: number
}
