/**
 * This is the description of the interface
 *
 * @interface ISetRedisRegistrationDataInput
 * @property {string} email is used for whatever reason
 * @property {string} login is used for whatever reason
 * @property {string} passwordHash is used for whatever reason
 * @property {string} code is used for whatever reason
 */
export interface ISetRedisRegistrationDataInput {
  email: string
  key: string
  firstName: string
  passwordHash: string
  code: string
  phoneNumber: string

  [name: string]: unknown
}
