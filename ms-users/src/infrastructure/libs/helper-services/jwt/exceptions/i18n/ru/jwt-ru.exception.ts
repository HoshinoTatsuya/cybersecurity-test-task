import { errorCode } from '../../constants/code-error.constant'
import { JwtExceptionEnum } from '../../enums'
import { JwtBaseExceptionType } from '../../types'

export const jwtExceptionRu: JwtBaseExceptionType = {
  [JwtExceptionEnum.ACCESS_TOKEN_UNCORRECTED]: {
    code: errorCode[JwtExceptionEnum.ACCESS_TOKEN_UNCORRECTED],
    errorName: JwtExceptionEnum.ACCESS_TOKEN_UNCORRECTED,
    message: 'Access токен не корректный!',
    description: 'Access токен не корректный!',
  },
  [JwtExceptionEnum.REFRESH_TOKEN_UNCORRECTED]: {
    code: errorCode[JwtExceptionEnum.REFRESH_TOKEN_UNCORRECTED],
    errorName: JwtExceptionEnum.REFRESH_TOKEN_UNCORRECTED,
    message: 'Refresh токен не корректный!',
    description: 'Refresh токен не корректный!',
  },
  [JwtExceptionEnum.WRONG_SECRET_PROVIDER_ERROR]: {
    code: errorCode[JwtExceptionEnum.WRONG_SECRET_PROVIDER_ERROR],
    errorName: JwtExceptionEnum.WRONG_SECRET_PROVIDER_ERROR,
    message: 'Для асинхронной версии "secretOrKeyProvider" используйте "signAsync"!',
    description: 'Для асинхронной версии "secretOrKeyProvider" используйте "signAsync"!',
  },
  [JwtExceptionEnum.PAYLOAD_STRING_ERROR]: {
    code: errorCode[JwtExceptionEnum.PAYLOAD_STRING_ERROR],
    errorName: JwtExceptionEnum.PAYLOAD_STRING_ERROR,
    message: 'Полезная нагрузка в виде строки не допускается с переданными параметрами!',
    description: 'Полезная нагрузка в виде строки не допускается со следующими параметрами знака: ',
  },
  [JwtExceptionEnum.USED_OLD_VERSION_METHOD_WITHOUT_SECRET]: {
    code: errorCode[JwtExceptionEnum.USED_OLD_VERSION_METHOD_WITHOUT_SECRET],
    errorName: JwtExceptionEnum.USED_OLD_VERSION_METHOD_WITHOUT_SECRET,
    message: 'Вы использовали старую версию jwt для создания токенов или токена и не устанавливали секрет!',
    description: 'Вы использовали старую версию jwt для создания токенов или токена и не устанавливали секрет!',
  },
  [JwtExceptionEnum.LIFE_TIME_TOKEN_UNCORRECTED]: {
    code: errorCode[JwtExceptionEnum.LIFE_TIME_TOKEN_UNCORRECTED],
    errorName: JwtExceptionEnum.LIFE_TIME_TOKEN_UNCORRECTED,
    message: 'Время жизни токена в файле конфигурации определено неправильно!',
    description: 'Время жизни токена в файле конфигурации определено неправильно!',
  },
  [JwtExceptionEnum.JWT_EXPIRED]: {
    code: errorCode[JwtExceptionEnum.JWT_EXPIRED],
    errorName: JwtExceptionEnum.JWT_EXPIRED,
    message: 'Срок действия токена истек!',
    description: 'Срок действия токена истек!',
  },
  [JwtExceptionEnum.UNKNOWN_ERROR]: {
    code: errorCode[JwtExceptionEnum.UNKNOWN_ERROR],
    errorName: JwtExceptionEnum.UNKNOWN_ERROR,
    message: 'Зафиксирована неизвестная ошибка!',
    description: 'Зафиксирована неизвестная ошибка: ',
  },
}
