import { BaseException } from '@libs/shared/common/exceptions'
import { applyDecorators } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ApiVerifyTokenBadResponses(): MethodDecorator {
  return applyDecorators(
    ApiResponse(BaseException.authenticationSchema.SESSION_NOT_FOUND),
    ApiResponse(BaseException.authenticationSchema.VERIFICATION_FAILED),
    ApiResponse(BaseException.authenticationSchema.ACCESS_TOKEN_EXPIRED),
    ApiResponse(BaseException.authenticationSchema.REFRESH_TOKEN_EXPIRED),
  )
}
