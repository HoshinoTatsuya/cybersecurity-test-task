import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import {
  MsCommentsModuleOptions,
  MsCommentsModuleOptionsFactory,
} from '../libs/interaction-external-services/ms-comments/ms-comments.interface'

@Injectable()
export class MsCommentsConfig implements MsCommentsModuleOptionsFactory {
  public constructor(private readonly _configService: ConfigService) {}

  public createMsCommentsOptions(): MsCommentsModuleOptions {
    return {
      serviceName: this._configService.get<string>('DCBANK_HOST'),
      logger: {
        axios: this._configService.get<boolean>('DCBANK_CLIENT_ID'),
        nats: this._configService.get<boolean>('DCBANK_CLIENT_ID'),
      },
    }
  }
}
