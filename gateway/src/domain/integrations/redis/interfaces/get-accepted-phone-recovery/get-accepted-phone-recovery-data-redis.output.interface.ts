/**
 * This is the description of the interface
 *
 * @interface IGetAcceptedPhoneRecoveryDataRedisOutput
 * @property {string} code is used for whatever reason
 */
export interface IGetAcceptedPhoneRecoveryDataRedisOutput {
  accepted: boolean
  timeRequest: number
  expiresTime: number
}
