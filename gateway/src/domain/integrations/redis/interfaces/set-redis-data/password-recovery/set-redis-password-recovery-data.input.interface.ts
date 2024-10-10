/**
 * This is the description of the interface
 *
 * @interface ISetRedisPasswordRecoveryDataInput
 * @property {string} key is used for whatever reason
 * @property {string} code is used for whatever reason
 */
export interface ISetRedisPasswordRecoveryDataInput {
  key: string
  code: string
  accepted: boolean
}
