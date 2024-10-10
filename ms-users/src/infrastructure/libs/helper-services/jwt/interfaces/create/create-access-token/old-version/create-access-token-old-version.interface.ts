/**
 * This is the description of the interface
 *
 * @interface ICreateAccessTokenOldVersion
 * @property {Record<string, unknown> | undefined} [accessTokenData = undefined] is used for whatever reason
 */
export interface ICreateAccessTokenOldVersion<AccessTokenInputType extends Record<string, unknown> | undefined> {
  accessTokenData?: AccessTokenInputType
}
