/**
 * This is the description of the interface
 *
 * @interface ICreateAccessTokenNewVersionInput
 * @property {string} userId is used for whatever reason
 * @property {string} sessionId is used for whatever reason
 * @property {string} refreshToken is used for whatever reason
 */
export interface ICreateAccessTokenNewVersionInput {
  userId: string
  role: string
  refreshToken: string
}
