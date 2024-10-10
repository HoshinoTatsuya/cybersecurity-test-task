import { codeError } from '../../constants/code-error.constant'
import { constraintError, constraintSuccess } from '../../constants/nesting-text.constant'
import { AuthenticationExceptionEnum } from '../../enums/authentication-exception.enum'
import { AuthenticationExceptionType } from '../../types/authentication'

export const authenticationExceptionEn: AuthenticationExceptionType = {
  [AuthenticationExceptionEnum.CODE_NOT_FOUND]: {
    code: codeError[AuthenticationExceptionEnum.CODE_NOT_FOUND],
    errorName: AuthenticationExceptionEnum.CODE_NOT_FOUND,
    message: `The entered code was not found!`,
    description: `The entered code was not found!`,
  },
  [AuthenticationExceptionEnum.SESSION_IS_CURRENT]: {
    code: codeError[AuthenticationExceptionEnum.SESSION_IS_CURRENT],
    errorName: AuthenticationExceptionEnum.SESSION_IS_CURRENT,
    message: `You can't end your current session, but you can always log out!`,
    description: `You can't end your current session, but you can always log out!`,
  },
  [AuthenticationExceptionEnum.CODE_IS_NOT_ACCEPTED]: {
    code: codeError[AuthenticationExceptionEnum.CODE_IS_NOT_ACCEPTED],
    errorName: AuthenticationExceptionEnum.CODE_IS_NOT_ACCEPTED,
    message: `You must confirm the code to complete the operation!`,
    description: `You must confirm the code to complete the operation!`,
  },
  [AuthenticationExceptionEnum.INCORRECT_PASSWORD]: {
    code: codeError[AuthenticationExceptionEnum.INCORRECT_PASSWORD],
    errorName: AuthenticationExceptionEnum.INCORRECT_PASSWORD,
    message: `Incorrect password entered!`,
    description: `Incorrect password entered!`,
  },
  [AuthenticationExceptionEnum.INCORRECT_OLD_PASSWORD]: {
    code: codeError[AuthenticationExceptionEnum.INCORRECT_OLD_PASSWORD],
    errorName: AuthenticationExceptionEnum.INCORRECT_OLD_PASSWORD,
    message: `The old password was entered incorrectly!`,
    description: `The old password was entered incorrectly!`,
  },
  [AuthenticationExceptionEnum.INCORRECT_CODE]: {
    code: codeError[AuthenticationExceptionEnum.INCORRECT_CODE],
    errorName: AuthenticationExceptionEnum.INCORRECT_CODE,
    message: `Wrong code entered!`,
    description: `Wrong code entered!`,
  },
  [AuthenticationExceptionEnum.EMAIL_IS_NOT_FOUND]: {
    code: codeError[AuthenticationExceptionEnum.EMAIL_IS_NOT_FOUND],
    errorName: AuthenticationExceptionEnum.EMAIL_IS_NOT_FOUND,
    message: `Sending the code by email is impossible!`,
    description: `Email was not specified when sending the code!`,
  },
  [AuthenticationExceptionEnum.PHONE_IS_NOT_FOUND]: {
    code: codeError[AuthenticationExceptionEnum.PHONE_IS_NOT_FOUND],
    errorName: AuthenticationExceptionEnum.PHONE_IS_NOT_FOUND,
    message: `Sending a code to your phone is not possible!`,
    description: `The phone number was not specified when the code was sent!`,
  },
  [AuthenticationExceptionEnum.EMAIL_IS_NOT_FOUND_IN_LOGIN]: {
    code: codeError[AuthenticationExceptionEnum.EMAIL_IS_NOT_FOUND_IN_LOGIN],
    errorName: AuthenticationExceptionEnum.EMAIL_IS_NOT_FOUND_IN_LOGIN,
    message: `Email was not specified during login!`,
    description: `Email was not specified during login!`,
  },
  [AuthenticationExceptionEnum.PHONE_IS_NOT_FOUND_IN_LOGIN]: {
    code: codeError[AuthenticationExceptionEnum.PHONE_IS_NOT_FOUND_IN_LOGIN],
    errorName: AuthenticationExceptionEnum.PHONE_IS_NOT_FOUND_IN_LOGIN,
    message: `Phone number was not specified during login!`,
    description: `Phone number was not specified during login!`,
  },
  [AuthenticationExceptionEnum.CONFIRMATION_TYPE_IS_NOT_FOUND]: {
    code: codeError[AuthenticationExceptionEnum.CONFIRMATION_TYPE_IS_NOT_FOUND],
    errorName: AuthenticationExceptionEnum.CONFIRMATION_TYPE_IS_NOT_FOUND,
    message: `The user data confirmation type was not found in the system!`,
    description: `The user data confirmation type was not found in the system!`,
  },
  [AuthenticationExceptionEnum.LIMIT_FOR_REQUEST_EXCEEDED]: {
    code: codeError[AuthenticationExceptionEnum.LIMIT_FOR_REQUEST_EXCEEDED],
    errorName: AuthenticationExceptionEnum.LIMIT_FOR_REQUEST_EXCEEDED,
    message: `Too many requests. Repeat after 60 seconds!`,
    description: `Too many requests. Repeat after 60 seconds!`,
  },
  [AuthenticationExceptionEnum.INVALID_ROLE_FOR_THIS_ACTION]: {
    code: codeError[AuthenticationExceptionEnum.INVALID_ROLE_FOR_THIS_ACTION],
    errorName: AuthenticationExceptionEnum.INVALID_ROLE_FOR_THIS_ACTION,
    message: `Invalid role for this action`,
    description: `Invalid role for this action`,
  },
  [AuthenticationExceptionEnum.USER_CREDENTIAL_IS_NOT_PROTECTED]: {
    code: codeError[AuthenticationExceptionEnum.USER_CREDENTIAL_IS_NOT_PROTECTED],
    errorName: AuthenticationExceptionEnum.USER_CREDENTIAL_IS_NOT_PROTECTED,
    message: `Data already exists in the system!`,
    description: `The following data needs to be changed:`,
  },
  [AuthenticationExceptionEnum.VERIFICATION_FAILED]: {
    code: codeError[AuthenticationExceptionEnum.VERIFICATION_FAILED],
    errorName: AuthenticationExceptionEnum.VERIFICATION_FAILED,
    message: `Verification failed!`,
    description: `Verification failed!`,
  },
  [AuthenticationExceptionEnum.TOKEN_SUBSTITUTION]: {
    code: codeError[AuthenticationExceptionEnum.TOKEN_SUBSTITUTION],
    errorName: AuthenticationExceptionEnum.TOKEN_SUBSTITUTION,
    message: `An attempt to replace a token was detected!`,
    description: `An attempt was detected to replace a token with the following parameters: `,
  },
  [AuthenticationExceptionEnum.USER_DATA_UPDATE_FAILED_WITH_ERROR]: {
    code: codeError[AuthenticationExceptionEnum.USER_DATA_UPDATE_FAILED_WITH_ERROR],
    errorName: AuthenticationExceptionEnum.USER_DATA_UPDATE_FAILED_WITH_ERROR,
    message: `User data update failed with an error!`,
    description: `Successfully updated: ${constraintSuccess}; The update completed with an error: ${constraintError}`,
  },

  [AuthenticationExceptionEnum.THIRD_PARTY_IP]: {
    code: codeError[AuthenticationExceptionEnum.THIRD_PARTY_IP],
    errorName: AuthenticationExceptionEnum.THIRD_PARTY_IP,
    message: `Third party IP detected!`,
    description: `An attempt was detected to replace a token with the following parameters: `,
  },

  [AuthenticationExceptionEnum.THIRD_PARTY_CLIENT]: {
    code: codeError[AuthenticationExceptionEnum.THIRD_PARTY_CLIENT],
    errorName: AuthenticationExceptionEnum.THIRD_PARTY_CLIENT,
    message: `Third party client detected!`,
    description: `An attempt was detected to replace a token with the following parameters: `,
  },

  [AuthenticationExceptionEnum.HACKING_ATTEMPT_DETECTED]: {
    code: codeError[AuthenticationExceptionEnum.HACKING_ATTEMPT_DETECTED],
    errorName: AuthenticationExceptionEnum.HACKING_ATTEMPT_DETECTED,
    message: `A hacking attempt was detected using the following parameters:`,
    description: `A hacking attempt was detected with the following parameters: `,
  },

  [AuthenticationExceptionEnum.ACCESS_TOKEN_EXPIRED]: {
    code: codeError[AuthenticationExceptionEnum.ACCESS_TOKEN_EXPIRED],
    errorName: AuthenticationExceptionEnum.ACCESS_TOKEN_EXPIRED,
    message: `Re-login please!`,
    description: `Re-login please!`,
  },
  [AuthenticationExceptionEnum.REFRESH_TOKEN_EXPIRED]: {
    code: codeError[AuthenticationExceptionEnum.REFRESH_TOKEN_EXPIRED],
    errorName: AuthenticationExceptionEnum.REFRESH_TOKEN_EXPIRED,
    message: `Re-login please!`,
    description: `Re-login please!`,
  },
  [AuthenticationExceptionEnum.ACCESS_TOKEN_UNCORRECTED]: {
    code: codeError[AuthenticationExceptionEnum.ACCESS_TOKEN_UNCORRECTED],
    errorName: AuthenticationExceptionEnum.ACCESS_TOKEN_UNCORRECTED,
    message: `Re-login please!`,
    description: `Re-login please!`,
  },
  [AuthenticationExceptionEnum.REFRESH_TOKEN_UNCORRECTED]: {
    code: codeError[AuthenticationExceptionEnum.REFRESH_TOKEN_UNCORRECTED],
    errorName: AuthenticationExceptionEnum.REFRESH_TOKEN_UNCORRECTED,
    message: `Re-login please!`,
    description: `Re-login please!`,
  },

  [AuthenticationExceptionEnum.SESSION_NOT_FOUND]: {
    code: codeError[AuthenticationExceptionEnum.SESSION_NOT_FOUND],
    errorName: AuthenticationExceptionEnum.SESSION_NOT_FOUND,
    message: `Session not found!`,
    description: `Session not found!`,
  },
  [AuthenticationExceptionEnum.EMAIL_CODE_NOT_FOUND]: {
    code: codeError[AuthenticationExceptionEnum.EMAIL_CODE_NOT_FOUND],
    errorName: AuthenticationExceptionEnum.EMAIL_CODE_NOT_FOUND,
    message: `Email code not found!`,
    description: `Email code not found!`,
  },
  [AuthenticationExceptionEnum.REGISTRATION_DATA_NOT_FOUND]: {
    code: codeError[AuthenticationExceptionEnum.REGISTRATION_DATA_NOT_FOUND],
    errorName: AuthenticationExceptionEnum.REGISTRATION_DATA_NOT_FOUND,
    message: `Registration data not found!`,
    description: `Registration data not found!`,
  },
  [AuthenticationExceptionEnum.INCORRECT_REGISTRATION_CODE]: {
    code: codeError[AuthenticationExceptionEnum.INCORRECT_REGISTRATION_CODE],
    errorName: AuthenticationExceptionEnum.INCORRECT_REGISTRATION_CODE,
    message: `Incorrect registration code!`,
    description: `Incorrect registration code!`,
  },
  [AuthenticationExceptionEnum.TOKEN_IS_MISSING_IN_HEADERS]: {
    code: codeError[AuthenticationExceptionEnum.TOKEN_IS_MISSING_IN_HEADERS],
    errorName: AuthenticationExceptionEnum.TOKEN_IS_MISSING_IN_HEADERS,
    message: `You don't authorisation! Please login first and try again!`,
    description: `You don't authorisation! Please login first and try again!`,
  },
}
