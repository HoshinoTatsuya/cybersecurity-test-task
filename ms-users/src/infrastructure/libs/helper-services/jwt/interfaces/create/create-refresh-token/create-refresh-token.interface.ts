/**
 * This is the description of the interface
 *
 * @interface ICreateRefreshToken
 * @property {Record<string, unknown> | undefined} [refreshTokenData = undefined] is used for whatever reason
 */
export interface ICreateRefreshToken<RefreshTokenInputType extends Record<string, unknown> | undefined> {
  refreshTokenData?: RefreshTokenInputType
}
