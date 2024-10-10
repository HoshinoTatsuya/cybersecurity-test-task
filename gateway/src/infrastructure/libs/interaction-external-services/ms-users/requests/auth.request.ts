import { Injectable } from '@nestjs/common'
import { ClientNats } from '@nestjs/microservices'

import { BaseException } from '../../../../../domain/exceptions'
import { BaseRequestsService } from '../base-request.service'
import { IMsUsersModuleOptionsFactory } from '../ms-users.interface'

import { route } from './constants'
import { ILogin } from './interfaces/auth'
import { LoginModel } from './models/auth'

@Injectable()
export class AuthRequest extends BaseRequestsService {
  private _msUsersConfig: IMsUsersModuleOptionsFactory

  public constructor(
    public msUsersConfigService: IMsUsersModuleOptionsFactory,
    public _client: ClientNats,
  ) {
    super(msUsersConfigService.logger.nats, msUsersConfigService.logger.axios, _client)
    this._msUsersConfig = msUsersConfigService
  }

  public async login(payload: ILogin): Promise<LoginModel> {
    try {
      const result = await this.natsRequestWithResponse<LoginModel, ILogin>({
        serviceName: route.auth.nameService,
        method: route.auth.methods.login,
        payload,
      })

      if (result instanceof BaseException) {
        return result
      }

      return new LoginModel()
    } catch (error) {
      return new BaseException().errorSubstitution({ error })
    }
  }
}
