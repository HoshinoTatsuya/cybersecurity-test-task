/**
 * This is the description of the interface
 *
 * @interface DefaultCheckVariable
 * @property {string} redis is used for whatever reason
 * @property {string} input is used for whatever reason
 */
interface DefaultCheckVariable {
  redis: string
  input: string
}

/**
 * This is the description of the interface
 *
 * @interface IVerifyRedisDataWithInputDataInput
 * @property {DefaultCheckVariable} [accessToken = undefined] is used for whatever reason
 * @property {DefaultCheckVariable} [ipClient = undefined] is used for whatever reason
 * @property {DefaultCheckVariable} [userAgent = undefined] is used for whatever reason
 */
export interface IVerifyRedisDataWithInputDataInput {
  accessToken?: DefaultCheckVariable
  ipClient?: DefaultCheckVariable
  userAgent?: DefaultCheckVariable
}
