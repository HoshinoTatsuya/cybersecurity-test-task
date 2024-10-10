import { Role } from '@libs/shared/common/enums'
import { BaseException } from '@libs/shared/common/exceptions'
import { ValidateUtils } from '@libs/shared/common/utils/validate.utils'
import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common'

import { allRoles } from '../../common/constants'

export const CurrentUser = createParamDecorator(
  // eslint-disable-next-line @typescript-eslint/default-param-last
  (validRoles: Role[] = allRoles, context: ExecutionContext) => {
    const res = context.switchToHttp().getRequest()

    if (!res.user) {
      throw new UnauthorizedException('Invalid JWT-token', 'User not found in JWT-token')
    }

    const isValidRole = ValidateUtils.isValidRole({
      currentRole: res.user.dataCache.role,
      validRoles,
    })

    if (isValidRole instanceof BaseException) {
      return BaseException.createError(isValidRole)
    }

    return res.user
  },
)
