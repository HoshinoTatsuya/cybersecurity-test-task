import { BadRequestException, CanActivate, ExecutionContext, Inject } from '@nestjs/common'
import { Request } from 'express'

import { BaseException } from '../../domain/exceptions'
import { IUsers } from '../../domain/interfaces/users'
import { getShadowData } from '../../infrastructure/libs/shadow-agent/shadow-agent'
import { USERS_USECASE } from '../providers/users.provider'

export class AuthBaseAuthVersionGuard implements CanActivate {
  public constructor(@Inject(USERS_USECASE) private readonly _usersUsecase: IUsers) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const shadowData = getShadowData(request)
    let token = request.headers['authorization']
    if (!token || token?.length === 0) {
      const tokenIsMissingInHeadersError =
        BaseException.authentication[shadowData.userLanguage].TOKEN_IS_MISSING_IN_HEADERS

      throw new BadRequestException({
        code: tokenIsMissingInHeadersError.code,
        message: tokenIsMissingInHeadersError.message,
        description: tokenIsMissingInHeadersError.description,
        errorName: tokenIsMissingInHeadersError.errorName,
      })
    }

    if (token.includes('Bearer')) {
      token = token.split('Bearer ')[1]
    }

    const result = await this._usersUsecase.verifyToken({ accessToken: token })

    if (result instanceof BaseException) {
      throw BaseException.createError(result, shadowData.userLanguage)
    }

    request['user'] = result

    return true
  }
}
