import { ExceptionType } from '@libs/shared/common/exceptions'

import { AuthenticationExceptionEnum } from '../../enums'

export type AuthenticationExceptionType = Record<keyof typeof AuthenticationExceptionEnum, ExceptionType>
