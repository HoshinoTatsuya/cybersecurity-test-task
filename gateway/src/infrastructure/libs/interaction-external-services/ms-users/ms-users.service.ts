import { Inject, Injectable } from '@nestjs/common'
import { ClientNats } from '@nestjs/microservices'
import { NATS } from '../../nats/constants'

import { IMsUsersService } from './interfaces'
import { MS_USERS_MODULE_OPTIONS } from './ms-users.constants'
import { IMsUsersModuleOptionsFactory } from './ms-users.interface'
import { AuthRequest } from './requests/auth.request'
import { UsersRequest } from './requests/users.request'

@Injectable()
export class MsUsersService implements IMsUsersService {
  public constructor(
    @Inject(MS_USERS_MODULE_OPTIONS) private readonly _optionsMsUsers: IMsUsersModuleOptionsFactory,
    @Inject(NATS) private readonly _client: ClientNats,
  ) {}

  public get users(): UsersRequest {
    return new UsersRequest(this._optionsMsUsers, this._client)
  }

  public get auth(): AuthRequest {
    return new AuthRequest(this._optionsMsUsers, this._client)
  }
}
