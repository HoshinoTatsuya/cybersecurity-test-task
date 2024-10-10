/**
 * This is the description of the interface
 *
 * @interface ICreateTokensNewVersionOutput
 * @property {string} accessToken is used for whatever reason
 * @property {string} refreshToken is used for whatever reason
 * @property {number} refreshTokenExpire is used for whatever reason
 * @property {number} accessTokenExpire is used for whatever reason
 */
export interface ICreateTokensNewVersionOutput {
  accessToken: string
  refreshToken: string
  refreshTokenExpire: number
  accessTokenExpire: number
}
