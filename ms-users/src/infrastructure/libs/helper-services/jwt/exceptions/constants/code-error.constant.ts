import { JwtExceptionEnum } from '../enums'

export const errorCode: Record<keyof typeof JwtExceptionEnum, number> = {
  [JwtExceptionEnum.ACCESS_TOKEN_UNCORRECTED]: 1001,
  [JwtExceptionEnum.REFRESH_TOKEN_UNCORRECTED]: 1002,
  [JwtExceptionEnum.WRONG_SECRET_PROVIDER_ERROR]: 1003,
  [JwtExceptionEnum.PAYLOAD_STRING_ERROR]: 1004,
  [JwtExceptionEnum.USED_OLD_VERSION_METHOD_WITHOUT_SECRET]: 1005,
  [JwtExceptionEnum.LIFE_TIME_TOKEN_UNCORRECTED]: 1006,
  [JwtExceptionEnum.JWT_EXPIRED]: 1007,
  [JwtExceptionEnum.UNKNOWN_ERROR]: 1008,
}
