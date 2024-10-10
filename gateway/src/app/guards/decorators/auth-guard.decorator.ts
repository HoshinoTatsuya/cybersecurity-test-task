import { BaseException } from '@libs/shared/common/exceptions'
import { applyDecorators, UseGuards } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'

import { AuthBaseAuthVersionGuard } from '../../guards/auth-base-auth-version.guard'

import { ApiVerifyTokenBadResponses } from './api-verify-token-bad-responses.decorator'

// eslint-disable-next-line @typescript-eslint/naming-convention
export function AuthGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(AuthBaseAuthVersionGuard),
    ApiResponse(BaseException.authenticationSchema.TOKEN_IS_MISSING_IN_HEADERS),
    ApiVerifyTokenBadResponses(),
  )
}
