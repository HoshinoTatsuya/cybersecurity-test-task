/**
 * This is the description of the interface
 *
 * @interface IVerifyRefreshTokenOutput
 * @property {string} userId is used for whatever reason
 * @property {string} sessionId is used for whatever reason
 * @property {number} iat is used for whatever reason
 * @property {number} exp is used for whatever reason
 */
export interface IVerifyRefreshTokenOutput {
  userId: string
  sessionId: string
  iat: number
  exp: number
}
