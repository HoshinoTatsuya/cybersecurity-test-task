import { CommonExceptionEnum, UsersExceptionEnum } from '../enums'
import { AuthenticationExceptionEnum } from '../enums/authentication-exception.enum'
import { UnionEnumType } from '../types'

export const codeError: Record<keyof UnionEnumType, number> = {
  // Common
  [CommonExceptionEnum.INTERNAL_SERVER_ERROR]: 500,
  [CommonExceptionEnum.BAD_REQUEST]: 400,
  [CommonExceptionEnum.UNKNOWN_ERROR]: 520,
  [CommonExceptionEnum.DATA_DUPLICATION]: 400,
  [CommonExceptionEnum.VALIDATION]: 422,

  // Comments
  [UsersExceptionEnum.FAILED_TO_UPDATE_USER]: 10001,
  [UsersExceptionEnum.USER_IS_NOT_FOUND]: 10002,

  // Authentication
  [AuthenticationExceptionEnum.USER_CREDENTIAL_IS_NOT_PROTECTED]: 10002,
  [AuthenticationExceptionEnum.VERIFICATION_FAILED]: 10003,
  [AuthenticationExceptionEnum.TOKEN_SUBSTITUTION]: 10004,
  [AuthenticationExceptionEnum.THIRD_PARTY_IP]: 10005,
  [AuthenticationExceptionEnum.THIRD_PARTY_CLIENT]: 10006,
  [AuthenticationExceptionEnum.HACKING_ATTEMPT_DETECTED]: 10007,
  [AuthenticationExceptionEnum.EMAIL_IS_NOT_FOUND]: 10008,
  [AuthenticationExceptionEnum.PHONE_IS_NOT_FOUND]: 10009,
  [AuthenticationExceptionEnum.CONFIRMATION_TYPE_IS_NOT_FOUND]: 10010,
  [AuthenticationExceptionEnum.LIMIT_FOR_REQUEST_EXCEEDED]: 10011,
  [AuthenticationExceptionEnum.CODE_NOT_FOUND]: 10012,
  [AuthenticationExceptionEnum.CODE_IS_NOT_ACCEPTED]: 10013,
  [AuthenticationExceptionEnum.INCORRECT_CODE]: 10014,
  [AuthenticationExceptionEnum.EMAIL_IS_NOT_FOUND_IN_LOGIN]: 10015,
  [AuthenticationExceptionEnum.PHONE_IS_NOT_FOUND_IN_LOGIN]: 10016,
  [AuthenticationExceptionEnum.INCORRECT_PASSWORD]: 10017,
  [AuthenticationExceptionEnum.INCORRECT_OLD_PASSWORD]: 10018,
  [AuthenticationExceptionEnum.USER_DATA_UPDATE_FAILED_WITH_ERROR]: 10019,
  [AuthenticationExceptionEnum.SESSION_IS_CURRENT]: 10020,

  [AuthenticationExceptionEnum.ACCESS_TOKEN_EXPIRED]: 11001,
  [AuthenticationExceptionEnum.REFRESH_TOKEN_EXPIRED]: 11002,
  [AuthenticationExceptionEnum.ACCESS_TOKEN_UNCORRECTED]: 11003,
  [AuthenticationExceptionEnum.REFRESH_TOKEN_UNCORRECTED]: 11004,

  [AuthenticationExceptionEnum.SESSION_NOT_FOUND]: 12001,
  [AuthenticationExceptionEnum.EMAIL_CODE_NOT_FOUND]: 12002,
  [AuthenticationExceptionEnum.REGISTRATION_DATA_NOT_FOUND]: 12003,
  [AuthenticationExceptionEnum.INCORRECT_REGISTRATION_CODE]: 12004,

  [AuthenticationExceptionEnum.TOKEN_IS_MISSING_IN_HEADERS]: 13009,
  [AuthenticationExceptionEnum.INVALID_ROLE_FOR_THIS_ACTION]: 13010,
}
