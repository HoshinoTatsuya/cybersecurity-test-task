/**
 * This is the description of the interface
 *
 * @interface DataCache
 * @property {string} accessToken is used for whatever reason
 * @property {string} refreshToken is used for whatever reason
 * @property {string} ipClient is used for whatever reason
 * @property {string} userAgent is used for whatever reason
 */
interface DataCache {
  accessToken: string
  refreshToken: string
  ipClient: string
  userAgent: string
  saveDataForGetInVerifyToken: Record<string, unknown>
}

/**
 * This is the description of the interface
 *
 * @interface ISetRedisTokensDataInput
 * @property {string} sessionId is used for whatever reason
 * @property {string} userId is used for whatever reason
 * @property {DataCache} dataCache is used for whatever reason
 */
export interface ISetRedisTokensDataInput {
  sessionId: string
  userId: string
  dataCache: DataCache
}
