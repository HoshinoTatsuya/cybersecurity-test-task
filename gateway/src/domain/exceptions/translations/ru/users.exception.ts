import { codeError } from '../../constants/code-error.constant'
import { UsersExceptionEnum } from '../../enums'
import { UsersExceptionType } from '../../types/users'

export const usersExceptionRu: UsersExceptionType = {
  [UsersExceptionEnum.FAILED_TO_UPDATE_USER]: {
    code: codeError[UsersExceptionEnum.FAILED_TO_UPDATE_USER],
    errorName: UsersExceptionEnum.FAILED_TO_UPDATE_USER,
    message: `Не удалось обновить пользователя!`,
    description: `Не удалось обновить пользователя!`,
  },
  [UsersExceptionEnum.USER_IS_NOT_FOUND]: {
    code: codeError[UsersExceptionEnum.USER_IS_NOT_FOUND],
    errorName: UsersExceptionEnum.USER_IS_NOT_FOUND,
    message: `Пользователь не найден!`,
    description: `Пользователь не найден!`,
  },
}
