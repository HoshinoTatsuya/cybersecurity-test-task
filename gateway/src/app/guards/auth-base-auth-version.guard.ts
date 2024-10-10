import { BaseException } from '@libs/shared/common/exceptions'
import { getShadowData } from '@libs/shared/common/shadow-agent/shadow-agent'
import { BadRequestException, CanActivate, ExecutionContext, Inject } from '@nestjs/common'
import { Request } from 'express'

import { AuthBaseService } from '../authBase/auth-base.service'

export class AuthBaseAuthVersionGuard implements CanActivate {
  public constructor(@Inject(AuthBaseService) private _authBaseService: AuthBaseService) {}

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

    // TODO: Проверка на составленный хеш с клиента, через обращение в наследованный для этого класс!
    //  А также там делать проверку на существование самого хеша!
    const result = await this._authBaseService.verifyToken({ accessToken: token, shadowData })

    if (result instanceof BaseException) {
      throw BaseException.createError(result, shadowData.userLanguage)
    }

    request['user'] = result

    return true
  }
}
