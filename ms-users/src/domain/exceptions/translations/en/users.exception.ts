import { codeError } from '../../constants/code-error.constant'
import { UsersExceptionEnum } from '../../enums'
import { UsersExceptionType } from '../../types/users'

export const usersExceptionEn: UsersExceptionType = {
  [UsersExceptionEnum.FAILED_TO_UPDATE_USER]: {
    code: codeError[UsersExceptionEnum.FAILED_TO_UPDATE_USER],
    errorName: UsersExceptionEnum.FAILED_TO_UPDATE_USER,
    message: `Failed to update user!`,
    description: `Failed to update user!`,
  },
  [UsersExceptionEnum.USER_IS_NOT_FOUND]: {
    code: codeError[UsersExceptionEnum.USER_IS_NOT_FOUND],
    errorName: UsersExceptionEnum.USER_IS_NOT_FOUND,
    message: `User not found!`,
    description: `User not found!`,
  },
}
