/**
 * This is the description of the interface
 *
 * @interface ICreateTokensOldVersion
 * @property {Record<string, unknown> | undefined} [accessTokenData = undefined] is used for whatever reason
 * @property {Record<string, unknown> | undefined} [refreshTokenData = undefined] is used for whatever reason
 */
export interface ICreateTokensOldVersion<
  AccessTokenDataType extends Record<string, unknown> | undefined,
  RefreshTokenDataType extends Record<string, unknown> | undefined,
> {
  accessTokenData?: AccessTokenDataType
  refreshTokenData?: RefreshTokenDataType
}
