import { AuthenticationExceptionEnum } from '@libs/shared/common/exceptions'
import { authenticationExceptionEn } from '@libs/shared/common/exceptions/translations'
import { badResponseSchemaFactory } from '@libs/shared/common/factories/bad-response-schema.factory'

export const authenticationSchemas = {
  [AuthenticationExceptionEnum.CODE_NOT_FOUND]: badResponseSchemaFactory(authenticationExceptionEn.CODE_NOT_FOUND),
  [AuthenticationExceptionEnum.CODE_IS_NOT_ACCEPTED]: badResponseSchemaFactory(
    authenticationExceptionEn.CODE_IS_NOT_ACCEPTED,
  ),
  [AuthenticationExceptionEnum.INCORRECT_CODE]: badResponseSchemaFactory(authenticationExceptionEn.INCORRECT_CODE),
  [AuthenticationExceptionEnum.EMAIL_IS_NOT_FOUND]: badResponseSchemaFactory(
    authenticationExceptionEn.EMAIL_IS_NOT_FOUND,
  ),
  [AuthenticationExceptionEnum.PHONE_IS_NOT_FOUND]: badResponseSchemaFactory(
    authenticationExceptionEn.PHONE_IS_NOT_FOUND,
  ),
  [AuthenticationExceptionEnum.EMAIL_IS_NOT_FOUND_IN_LOGIN]: badResponseSchemaFactory(
    authenticationExceptionEn.EMAIL_IS_NOT_FOUND_IN_LOGIN,
  ),
  [AuthenticationExceptionEnum.PHONE_IS_NOT_FOUND_IN_LOGIN]: badResponseSchemaFactory(
    authenticationExceptionEn.PHONE_IS_NOT_FOUND_IN_LOGIN,
  ),
  [AuthenticationExceptionEnum.CONFIRMATION_TYPE_IS_NOT_FOUND]: badResponseSchemaFactory(
    authenticationExceptionEn.CONFIRMATION_TYPE_IS_NOT_FOUND,
  ),
  [AuthenticationExceptionEnum.LIMIT_FOR_REQUEST_EXCEEDED]: badResponseSchemaFactory(
    authenticationExceptionEn.LIMIT_FOR_REQUEST_EXCEEDED,
  ),
  [AuthenticationExceptionEnum.INVALID_ROLE_FOR_THIS_ACTION]: badResponseSchemaFactory(
    authenticationExceptionEn.INVALID_ROLE_FOR_THIS_ACTION,
  ),
  [AuthenticationExceptionEnum.USER_CREDENTIAL_IS_NOT_PROTECTED]: badResponseSchemaFactory(
    authenticationExceptionEn.USER_CREDENTIAL_IS_NOT_PROTECTED,
  ),
  [AuthenticationExceptionEnum.VERIFICATION_FAILED]: badResponseSchemaFactory(
    authenticationExceptionEn.VERIFICATION_FAILED,
  ),
  [AuthenticationExceptionEnum.TOKEN_SUBSTITUTION]: badResponseSchemaFactory(
    authenticationExceptionEn.TOKEN_SUBSTITUTION,
  ),
  [AuthenticationExceptionEnum.THIRD_PARTY_IP]: badResponseSchemaFactory(authenticationExceptionEn.THIRD_PARTY_IP),
  [AuthenticationExceptionEnum.THIRD_PARTY_CLIENT]: badResponseSchemaFactory(
    authenticationExceptionEn.THIRD_PARTY_CLIENT,
  ),
  [AuthenticationExceptionEnum.HACKING_ATTEMPT_DETECTED]: badResponseSchemaFactory(
    authenticationExceptionEn.HACKING_ATTEMPT_DETECTED,
  ),
  [AuthenticationExceptionEnum.ACCESS_TOKEN_EXPIRED]: badResponseSchemaFactory(
    authenticationExceptionEn.ACCESS_TOKEN_EXPIRED,
  ),
  [AuthenticationExceptionEnum.REFRESH_TOKEN_EXPIRED]: badResponseSchemaFactory(
    authenticationExceptionEn.REFRESH_TOKEN_EXPIRED,
  ),
  [AuthenticationExceptionEnum.ACCESS_TOKEN_UNCORRECTED]: badResponseSchemaFactory(
    authenticationExceptionEn.ACCESS_TOKEN_UNCORRECTED,
  ),
  [AuthenticationExceptionEnum.REFRESH_TOKEN_UNCORRECTED]: badResponseSchemaFactory(
    authenticationExceptionEn.REFRESH_TOKEN_UNCORRECTED,
  ),
  [AuthenticationExceptionEnum.SESSION_NOT_FOUND]: badResponseSchemaFactory(
    authenticationExceptionEn.SESSION_NOT_FOUND,
  ),
  [AuthenticationExceptionEnum.EMAIL_CODE_NOT_FOUND]: badResponseSchemaFactory(
    authenticationExceptionEn.EMAIL_CODE_NOT_FOUND,
  ),
  [AuthenticationExceptionEnum.REGISTRATION_DATA_NOT_FOUND]: badResponseSchemaFactory(
    authenticationExceptionEn.REGISTRATION_DATA_NOT_FOUND,
  ),
  [AuthenticationExceptionEnum.INCORRECT_REGISTRATION_CODE]: badResponseSchemaFactory(
    authenticationExceptionEn.INCORRECT_REGISTRATION_CODE,
  ),
  [AuthenticationExceptionEnum.TOKEN_IS_MISSING_IN_HEADERS]: badResponseSchemaFactory(
    authenticationExceptionEn.TOKEN_IS_MISSING_IN_HEADERS,
  ),
  [AuthenticationExceptionEnum.INCORRECT_PASSWORD]: badResponseSchemaFactory(
    authenticationExceptionEn.INCORRECT_PASSWORD,
  ),
  [AuthenticationExceptionEnum.INCORRECT_OLD_PASSWORD]: badResponseSchemaFactory(
    authenticationExceptionEn.INCORRECT_OLD_PASSWORD,
  ),
  [AuthenticationExceptionEnum.USER_DATA_UPDATE_FAILED_WITH_ERROR]: badResponseSchemaFactory(
    authenticationExceptionEn.USER_DATA_UPDATE_FAILED_WITH_ERROR,
  ),
  [AuthenticationExceptionEnum.SESSION_IS_CURRENT]: badResponseSchemaFactory(
    authenticationExceptionEn.SESSION_IS_CURRENT,
  ),

  // GREEN API
  [AuthenticationExceptionEnum.AUTHORIZATION_DECLINED]: badResponseSchemaFactory(
    authenticationExceptionEn.AUTHORIZATION_DECLINED,
  ),
  [AuthenticationExceptionEnum.AUTHORIZATION_INTERNAL_SERVER_ERROR]: badResponseSchemaFactory(
    authenticationExceptionEn.AUTHORIZATION_INTERNAL_SERVER_ERROR,
  ),
  [AuthenticationExceptionEnum.PHONE_INSUFFICIENT_FUNDS]: badResponseSchemaFactory(
    authenticationExceptionEn.PHONE_INSUFFICIENT_FUNDS,
  ),
  [AuthenticationExceptionEnum.PHONE_PARAMETER_MUST_BE_SET]: badResponseSchemaFactory(
    authenticationExceptionEn.PHONE_PARAMETER_MUST_BE_SET,
  ),
  [AuthenticationExceptionEnum.PHONE_UNSUPPORTED_PARAMETER_VALUE]: badResponseSchemaFactory(
    authenticationExceptionEn.PHONE_UNSUPPORTED_PARAMETER_VALUE,
  ),
  [AuthenticationExceptionEnum.PHONE_ACCOUNT_ACTIVATION_NEEDED]: badResponseSchemaFactory(
    authenticationExceptionEn.PHONE_ACCOUNT_ACTIVATION_NEEDED,
  ),
  [AuthenticationExceptionEnum.PHONE_LIMIT_FOR_NUMBER_EXCEEDED]: badResponseSchemaFactory(
    authenticationExceptionEn.PHONE_LIMIT_FOR_NUMBER_EXCEEDED,
  ),
  [AuthenticationExceptionEnum.PHONE_INTERNAL_SERVER_ERROR]: badResponseSchemaFactory(
    authenticationExceptionEn.PHONE_INTERNAL_SERVER_ERROR,
  ),
}
