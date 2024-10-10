/**
 * This is the description of the interface
 *
 * @interface ICreateAccessTokenNewVersion
 * @property {Record<string, unknown> | undefined} [accessTokenData = undefined] is used for whatever reason
 * @property {string} refreshToken is used for whatever reason
 */
export interface ICreateAccessTokenNewVersion<AccessTokenInputType extends Record<string, unknown> | undefined> {
  accessTokenData?: AccessTokenInputType
  refreshToken: string
}
