/**
 * This is the description of the interface
 *
 * @interface IGetRegistrationDataRedisOutput
 * @property {string} login is used for whatever reason
 * @property {string} email is used for whatever reason
 * @property {string} code is used for whatever reason
 * @property {string} passwordHash is used for whatever reason
 */
export interface IGetRegistrationDataRedisOutput {
  firstName: string
  email: string
  code: string
  phoneNumber: string
  passwordHash: string
  timeRequest: number
  expiresTime: number
}
