import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common'

import { Role } from '../../../domain/enums'
import { BaseException } from '../../../domain/exceptions'
import { ValidateUtils } from '../../../infrastructure/libs/utils/validate.utils'
import { allRoles } from '../../constants/utils.const'

export const CurrentUser = createParamDecorator(
  // eslint-disable-next-line @typescript-eslint/default-param-last
  (validRoles: Role[] = allRoles, context: ExecutionContext) => {
    const res = context.switchToHttp().getRequest()

    if (!res.user) {
      throw new UnauthorizedException('Invalid JWT-token', 'User not found in JWT-token')
    }

    const isValidRole = ValidateUtils.isValidRole({
      currentRole: res.user.role,
      validRoles,
    })

    if (isValidRole instanceof BaseException) {
      return BaseException.createError(isValidRole)
    }

    return res.user
  },
)
