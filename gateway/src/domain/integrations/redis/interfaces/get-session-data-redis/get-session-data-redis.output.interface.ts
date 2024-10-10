/**
 * This is the description of the interface
 *
 * @interface IGetSessionDataRedisOutput
 * @property {string} accessToken is used for whatever reason
 * @property {string} refreshToken is used for whatever reason
 * @property {string} ipClient is used for whatever reason
 * @property {string} userAgent is used for whatever reason
 */
export interface IGetSessionDataRedisOutput {
  accessToken: string
  refreshToken: string
  ipClient: string
  userAgent: string
  saveDataForGetInVerifyToken: Record<string, unknown>
}
