import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import {
  MsUsersModuleOptions,
  MsUsersModuleOptionsFactory,
} from '../libs/interaction-external-services/ms-users/ms-users.interface'

@Injectable()
export class MsUsersConfig implements MsUsersModuleOptionsFactory {
  public constructor(private readonly _configService: ConfigService) {}

  public createMsUsersOptions(): MsUsersModuleOptions {
    return {
      serviceName: this._configService.get<string>('MS_USERS_NAME'),
      logger: {
        axios: this._configService.get<boolean>('MS_USERS_LOG_AXIOS'),
        nats: this._configService.get<boolean>('MS_USERS_LOG_NATS'),
      },
    }
  }
}
