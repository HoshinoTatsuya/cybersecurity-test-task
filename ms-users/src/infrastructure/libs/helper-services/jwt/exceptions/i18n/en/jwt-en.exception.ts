import { errorCode } from '../../constants/code-error.constant'
import { JwtExceptionEnum } from '../../enums'
import { JwtBaseExceptionType } from '../../types'

export const jwtExceptionEn: JwtBaseExceptionType = {
  [JwtExceptionEnum.ACCESS_TOKEN_UNCORRECTED]: {
    code: errorCode[JwtExceptionEnum.ACCESS_TOKEN_UNCORRECTED],
    errorName: JwtExceptionEnum.ACCESS_TOKEN_UNCORRECTED,
    message: 'Access token uncorrected!',
    description: 'Access token uncorrected!',
  },
  [JwtExceptionEnum.REFRESH_TOKEN_UNCORRECTED]: {
    code: errorCode[JwtExceptionEnum.REFRESH_TOKEN_UNCORRECTED],
    errorName: JwtExceptionEnum.REFRESH_TOKEN_UNCORRECTED,
    message: 'Refresh token uncorrected!',
    description: 'Refresh token uncorrected!',
  },
  [JwtExceptionEnum.WRONG_SECRET_PROVIDER_ERROR]: {
    code: errorCode[JwtExceptionEnum.WRONG_SECRET_PROVIDER_ERROR],
    errorName: JwtExceptionEnum.WRONG_SECRET_PROVIDER_ERROR,
    message: 'For async version of "secretOrKeyProvider", please use "signAsync"!',
    description: 'For async version of "secretOrKeyProvider", please use "signAsync"!',
  },
  [JwtExceptionEnum.PAYLOAD_STRING_ERROR]: {
    code: errorCode[JwtExceptionEnum.PAYLOAD_STRING_ERROR],
    errorName: JwtExceptionEnum.PAYLOAD_STRING_ERROR,
    message: 'String payload is not allowed with passed parameters!',
    description: 'Payload as string is not allowed with the following sign options: ',
  },
  [JwtExceptionEnum.USED_OLD_VERSION_METHOD_WITHOUT_SECRET]: {
    code: errorCode[JwtExceptionEnum.USED_OLD_VERSION_METHOD_WITHOUT_SECRET],
    errorName: JwtExceptionEnum.USED_OLD_VERSION_METHOD_WITHOUT_SECRET,
    message: 'You used an old version of jwt to create tokens or token and did not set the secret!',
    description: 'You used an old version of jwt to create tokens or token and did not set the secret!',
  },
  [JwtExceptionEnum.LIFE_TIME_TOKEN_UNCORRECTED]: {
    code: errorCode[JwtExceptionEnum.LIFE_TIME_TOKEN_UNCORRECTED],
    errorName: JwtExceptionEnum.LIFE_TIME_TOKEN_UNCORRECTED,
    message: 'The lifetime of the token in the config file is not correctly defined!',
    description: 'The lifetime of the token in the config file is not correctly defined!',
  },
  [JwtExceptionEnum.JWT_EXPIRED]: {
    code: errorCode[JwtExceptionEnum.JWT_EXPIRED],
    errorName: JwtExceptionEnum.JWT_EXPIRED,
    message: 'Token has expired!',
    description: 'Token has expired!',
  },
  [JwtExceptionEnum.UNKNOWN_ERROR]: {
    code: errorCode[JwtExceptionEnum.UNKNOWN_ERROR],
    errorName: JwtExceptionEnum.UNKNOWN_ERROR,
    message: 'Unknown error detected!',
    description: 'Unknown error detected: ',
  },
}
