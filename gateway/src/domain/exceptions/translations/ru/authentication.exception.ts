import { codeError } from '@libs/shared/common/exceptions/constants/code-error.constant'
import { constraintError, constraintSuccess } from '@libs/shared/common/exceptions/constants/nesting-text.constant'

import { AuthenticationExceptionEnum } from '../../enums'
import { AuthenticationExceptionType } from '../../types'

export const authenticationExceptionRu: AuthenticationExceptionType = {
  [AuthenticationExceptionEnum.CODE_NOT_FOUND]: {
    code: codeError[AuthenticationExceptionEnum.CODE_NOT_FOUND],
    errorName: AuthenticationExceptionEnum.CODE_NOT_FOUND,
    message: `Введённый код не найден!`,
    description: `Введённый код не найден!`,
  },
  [AuthenticationExceptionEnum.SESSION_IS_CURRENT]: {
    code: codeError[AuthenticationExceptionEnum.SESSION_IS_CURRENT],
    errorName: AuthenticationExceptionEnum.SESSION_IS_CURRENT,
    message: `Вы не можете завершить текущую сессию, но вы всегда можете выйти из системы!`,
    description: `Вы не можете завершить текущую сессию, но вы всегда можете выйти из системы!`,
  },
  [AuthenticationExceptionEnum.CODE_IS_NOT_ACCEPTED]: {
    code: codeError[AuthenticationExceptionEnum.CODE_IS_NOT_ACCEPTED],
    errorName: AuthenticationExceptionEnum.CODE_IS_NOT_ACCEPTED,
    message: `Необходимо подтвердить код для выполнения операции!`,
    description: `Необходимо подтвердить код для выполнения операции!`,
  },
  [AuthenticationExceptionEnum.INCORRECT_CODE]: {
    code: codeError[AuthenticationExceptionEnum.INCORRECT_CODE],
    errorName: AuthenticationExceptionEnum.INCORRECT_CODE,
    message: `Введён неправильный код!`,
    description: `Введён неправильный код!`,
  },
  [AuthenticationExceptionEnum.INCORRECT_PASSWORD]: {
    code: codeError[AuthenticationExceptionEnum.INCORRECT_PASSWORD],
    errorName: AuthenticationExceptionEnum.INCORRECT_PASSWORD,
    message: `Введён неправильный пароль!`,
    description: `Введён неправильный пароль!`,
  },
  [AuthenticationExceptionEnum.INCORRECT_OLD_PASSWORD]: {
    code: codeError[AuthenticationExceptionEnum.INCORRECT_OLD_PASSWORD],
    errorName: AuthenticationExceptionEnum.INCORRECT_OLD_PASSWORD,
    message: `Старый пароль введен неправильно!`,
    description: `Старый пароль введен неправильно!`,
  },

  [AuthenticationExceptionEnum.USER_DATA_UPDATE_FAILED_WITH_ERROR]: {
    code: codeError[AuthenticationExceptionEnum.USER_DATA_UPDATE_FAILED_WITH_ERROR],
    errorName: AuthenticationExceptionEnum.USER_DATA_UPDATE_FAILED_WITH_ERROR,
    message: `Обновление данных пользователя завершилось с ошибкой!`,
    description: `Успешно обновлено: ${constraintSuccess}; Обновление завершилось с ошибкой: ${constraintError}!`,
  },

  [AuthenticationExceptionEnum.EMAIL_IS_NOT_FOUND]: {
    code: codeError[AuthenticationExceptionEnum.EMAIL_IS_NOT_FOUND],
    errorName: AuthenticationExceptionEnum.EMAIL_IS_NOT_FOUND,
    message: `Отправка кода на почту невозможна!`,
    description: `Почта не была указана во время отправки кода!`,
  },
  [AuthenticationExceptionEnum.EMAIL_IS_NOT_FOUND_IN_LOGIN]: {
    code: codeError[AuthenticationExceptionEnum.EMAIL_IS_NOT_FOUND_IN_LOGIN],
    errorName: AuthenticationExceptionEnum.EMAIL_IS_NOT_FOUND_IN_LOGIN,
    message: `Почта не была указана во время входа!`,
    description: `Почта не была указана во время входа!`,
  },
  [AuthenticationExceptionEnum.PHONE_IS_NOT_FOUND]: {
    code: codeError[AuthenticationExceptionEnum.PHONE_IS_NOT_FOUND],
    errorName: AuthenticationExceptionEnum.PHONE_IS_NOT_FOUND,
    message: `Отправка кода на телефон невозможна!`,
    description: `Телефон не был указан во время отправки кода!`,
  },
  [AuthenticationExceptionEnum.PHONE_IS_NOT_FOUND_IN_LOGIN]: {
    code: codeError[AuthenticationExceptionEnum.PHONE_IS_NOT_FOUND_IN_LOGIN],
    errorName: AuthenticationExceptionEnum.PHONE_IS_NOT_FOUND_IN_LOGIN,
    message: `Телефон не был указан во время входа!`,
    description: `Телефон не был указан во время входа!`,
  },
  [AuthenticationExceptionEnum.CONFIRMATION_TYPE_IS_NOT_FOUND]: {
    code: codeError[AuthenticationExceptionEnum.CONFIRMATION_TYPE_IS_NOT_FOUND],
    errorName: AuthenticationExceptionEnum.CONFIRMATION_TYPE_IS_NOT_FOUND,
    message: `Тип подтверждения данных пользователя не был найден в системе!`,
    description: `Тип подтверждения данных пользователя не был найден в системе!`,
  },
  [AuthenticationExceptionEnum.INCORRECT_REGISTRATION_CODE]: {
    code: codeError[AuthenticationExceptionEnum.INCORRECT_REGISTRATION_CODE],
    errorName: AuthenticationExceptionEnum.INCORRECT_REGISTRATION_CODE,
    message: `Неправильный регистрационный код!`,
    description: `Неправильный регистрационный код!`,
  },
  [AuthenticationExceptionEnum.USER_CREDENTIAL_IS_NOT_PROTECTED]: {
    code: codeError[AuthenticationExceptionEnum.USER_CREDENTIAL_IS_NOT_PROTECTED],
    errorName: AuthenticationExceptionEnum.USER_CREDENTIAL_IS_NOT_PROTECTED,
    message: `Данные уже существуют в системе!`,
    description: `Необходимо сменить следующие данные:`,
  },
  [AuthenticationExceptionEnum.VERIFICATION_FAILED]: {
    code: codeError[AuthenticationExceptionEnum.VERIFICATION_FAILED],
    errorName: AuthenticationExceptionEnum.VERIFICATION_FAILED,
    message: `Верификация не пройдена!`,
    description: `Верификация не пройдена!`,
  },
  [AuthenticationExceptionEnum.TOKEN_SUBSTITUTION]: {
    code: codeError[AuthenticationExceptionEnum.TOKEN_SUBSTITUTION],
    errorName: AuthenticationExceptionEnum.TOKEN_SUBSTITUTION,
    message: `Зафиксирована попытка подмены токена!`,
    description: `Зафиксирована попытка подмены токена со следующими параметрами: `,
  },
  [AuthenticationExceptionEnum.THIRD_PARTY_IP]: {
    code: codeError[AuthenticationExceptionEnum.THIRD_PARTY_IP],
    errorName: AuthenticationExceptionEnum.THIRD_PARTY_IP,
    message: `Обнаружен сторонний IP-адрес!`,
    description: `Зафиксирована попытка подмены токена со следующими параметрами: `,
  },
  [AuthenticationExceptionEnum.THIRD_PARTY_CLIENT]: {
    code: codeError[AuthenticationExceptionEnum.THIRD_PARTY_CLIENT],
    errorName: AuthenticationExceptionEnum.THIRD_PARTY_CLIENT,
    message: `Обнаружен сторонний клиент!`,
    description: `Зафиксирована попытка подмены токена со следующими параметрами: `,
  },
  [AuthenticationExceptionEnum.HACKING_ATTEMPT_DETECTED]: {
    code: codeError[AuthenticationExceptionEnum.HACKING_ATTEMPT_DETECTED],
    errorName: AuthenticationExceptionEnum.HACKING_ATTEMPT_DETECTED,
    message: `Обнаружена попытка взлома по следующим параметрам: `,
    description: `Зафиксирована попытка взлома со следующими параметрами: `,
  },
  [AuthenticationExceptionEnum.LIMIT_FOR_REQUEST_EXCEEDED]: {
    code: codeError[AuthenticationExceptionEnum.LIMIT_FOR_REQUEST_EXCEEDED],
    errorName: AuthenticationExceptionEnum.LIMIT_FOR_REQUEST_EXCEEDED,
    message: `Слишком много запросов. Повторите попытку через 60 секунд!`,
    description: `Слишком много запросов. Повторите попытку через 60 секунд!`,
  },
  [AuthenticationExceptionEnum.INVALID_ROLE_FOR_THIS_ACTION]: {
    code: codeError[AuthenticationExceptionEnum.INVALID_ROLE_FOR_THIS_ACTION],
    errorName: AuthenticationExceptionEnum.INVALID_ROLE_FOR_THIS_ACTION,
    message: `Невалидная роль для этого действия`,
    description: `Невалидная роль для этого действия`,
  },

  // JWT
  [AuthenticationExceptionEnum.ACCESS_TOKEN_EXPIRED]: {
    code: codeError[AuthenticationExceptionEnum.ACCESS_TOKEN_EXPIRED],
    errorName: AuthenticationExceptionEnum.ACCESS_TOKEN_EXPIRED,
    message: `Перезайдите в систему!`,
    description: `Перезайдите в систему!`,
  },
  [AuthenticationExceptionEnum.REFRESH_TOKEN_EXPIRED]: {
    code: codeError[AuthenticationExceptionEnum.REFRESH_TOKEN_EXPIRED],
    errorName: AuthenticationExceptionEnum.REFRESH_TOKEN_EXPIRED,
    message: `Перезайдите в систему!`,
    description: `Перезайдите в систему!`,
  },
  [AuthenticationExceptionEnum.ACCESS_TOKEN_UNCORRECTED]: {
    code: codeError[AuthenticationExceptionEnum.ACCESS_TOKEN_UNCORRECTED],
    errorName: AuthenticationExceptionEnum.ACCESS_TOKEN_UNCORRECTED,
    message: `Перезайдите в систему!`,
    description: `Перезайдите в систему!`,
  },
  [AuthenticationExceptionEnum.REFRESH_TOKEN_UNCORRECTED]: {
    code: codeError[AuthenticationExceptionEnum.REFRESH_TOKEN_UNCORRECTED],
    errorName: AuthenticationExceptionEnum.REFRESH_TOKEN_UNCORRECTED,
    message: `Перезайдите в систему!`,
    description: `Перезайдите в систему!`,
  },

  // REDIS
  [AuthenticationExceptionEnum.SESSION_NOT_FOUND]: {
    code: codeError[AuthenticationExceptionEnum.SESSION_NOT_FOUND],
    errorName: AuthenticationExceptionEnum.SESSION_NOT_FOUND,
    message: `Сессия не найдена!`,
    description: `Сессия не найдена!`,
  },
  [AuthenticationExceptionEnum.EMAIL_CODE_NOT_FOUND]: {
    code: codeError[AuthenticationExceptionEnum.EMAIL_CODE_NOT_FOUND],
    errorName: AuthenticationExceptionEnum.EMAIL_CODE_NOT_FOUND,
    message: `Код электронной почты не найден!`,
    description: `Код электронной почты не найден!`,
  },
  [AuthenticationExceptionEnum.REGISTRATION_DATA_NOT_FOUND]: {
    code: codeError[AuthenticationExceptionEnum.REGISTRATION_DATA_NOT_FOUND],
    errorName: AuthenticationExceptionEnum.REGISTRATION_DATA_NOT_FOUND,
    message: `Авторизация отклонена!`,
    description: `Регистрационные данные не найдены!`,
  },

  // GREEN API
  [AuthenticationExceptionEnum.AUTHORIZATION_DECLINED]: {
    code: codeError[AuthenticationExceptionEnum.AUTHORIZATION_DECLINED],
    errorName: AuthenticationExceptionEnum.AUTHORIZATION_DECLINED,
    message: `Авторизация отклонена!`,
    description: `Авторизация отклонена!`,
  },
  [AuthenticationExceptionEnum.AUTHORIZATION_INTERNAL_SERVER_ERROR]: {
    code: codeError[AuthenticationExceptionEnum.AUTHORIZATION_INTERNAL_SERVER_ERROR],
    errorName: AuthenticationExceptionEnum.AUTHORIZATION_INTERNAL_SERVER_ERROR,
    message: `Зафиксирована серверная ошибка!`,
    description: `Зафиксирована серверная ошибка в момент запроса на авторизацию!`,
  },
  [AuthenticationExceptionEnum.PHONE_INSUFFICIENT_FUNDS]: {
    code: codeError[AuthenticationExceptionEnum.PHONE_INSUFFICIENT_FUNDS],
    errorName: AuthenticationExceptionEnum.PHONE_INSUFFICIENT_FUNDS,
    message: `Недостаточно средств!`,
    description: `Недостаточно средств!`,
  },
  [AuthenticationExceptionEnum.PHONE_PARAMETER_MUST_BE_SET]: {
    code: codeError[AuthenticationExceptionEnum.PHONE_PARAMETER_MUST_BE_SET],
    errorName: AuthenticationExceptionEnum.PHONE_PARAMETER_MUST_BE_SET,
    message: `Параметр (to|txt) должен быть установлен.!`,
    description: `Параметр (to|txt) должен быть установлен.!`,
  },
  [AuthenticationExceptionEnum.PHONE_UNSUPPORTED_PARAMETER_VALUE]: {
    code: codeError[AuthenticationExceptionEnum.PHONE_UNSUPPORTED_PARAMETER_VALUE],
    errorName: AuthenticationExceptionEnum.PHONE_UNSUPPORTED_PARAMETER_VALUE,
    message: `Неопределенная ошибка!`,
    description: `Неопределенная ошибка!`,
  },
  [AuthenticationExceptionEnum.PHONE_ACCOUNT_ACTIVATION_NEEDED]: {
    code: codeError[AuthenticationExceptionEnum.PHONE_ACCOUNT_ACTIVATION_NEEDED],
    errorName: AuthenticationExceptionEnum.PHONE_ACCOUNT_ACTIVATION_NEEDED,
    message: `Разрешены только шаблонные сообщения!`,
    description: `Разрешены только шаблонные сообщения!`,
  },
  [AuthenticationExceptionEnum.PHONE_LIMIT_FOR_NUMBER_EXCEEDED]: {
    code: codeError[AuthenticationExceptionEnum.PHONE_LIMIT_FOR_NUMBER_EXCEEDED],
    errorName: AuthenticationExceptionEnum.PHONE_LIMIT_FOR_NUMBER_EXCEEDED,
    message: `Слишком много запросов на этот номер. Повторите попытку через 60 секунд!`,
    description: `Слишком много запросов на этот номер. Повторите попытку через 60 секунд!`,
  },
  [AuthenticationExceptionEnum.PHONE_INTERNAL_SERVER_ERROR]: {
    code: codeError[AuthenticationExceptionEnum.PHONE_INTERNAL_SERVER_ERROR],
    errorName: AuthenticationExceptionEnum.PHONE_INTERNAL_SERVER_ERROR,
    message: `Внутренняя ошибка сервера!`,
    description: `Внутренняя ошибка сервера!`,
  },
  [AuthenticationExceptionEnum.TOKEN_IS_MISSING_IN_HEADERS]: {
    code: codeError[AuthenticationExceptionEnum.TOKEN_IS_MISSING_IN_HEADERS],
    errorName: AuthenticationExceptionEnum.TOKEN_IS_MISSING_IN_HEADERS,
    message: `У вас нет авторизации! Пожалуйста, сначала войдите в систему и повторите попытку!`,
    description: `У вас нет авторизации! Пожалуйста, сначала войдите в систему и повторите попытку!`,
  },
}
