import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Transport } from '@nestjs/microservices'

import { BooleanUtils } from '../../utils/boolean.utils'
import { NatsClientModuleOptions, NatsClientModuleOptionsFactory } from '../interface-inject/nats-client.interface'

@Injectable()
export class NatsClientConfigService implements NatsClientModuleOptionsFactory {
  public constructor(private readonly _configService: ConfigService) {}

  public createNatsClientOptions(): NatsClientModuleOptions {
    const natsClientConfig = {
      name: this._configService.get<string>('NATS_MS_USERS_NAME', 'NATS'),
      transport: Transport.NATS,
      options: {
        servers: this._configService.get<string>('NATS_URL', '')?.split(','),
        reconnect: BooleanUtils.strToBoolWithDefault(
          this._configService.get<boolean>('NATS_RECONNECT', undefined),
          undefined,
        ),
        maxReconnectAttempts: Number.MAX_SAFE_INTEGER ?? undefined,
        waitOnFirstConnect: BooleanUtils.strToBoolWithDefault(
          this._configService.get<boolean>('NATS_WAIT_ON_FIRST_CONNECT', undefined),
          undefined,
        ),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        max_payload: this._configService.get<string>('NATS_MAX_PAYLOAD', undefined),
        maxPayload: Number(this._configService.get<number>('NATS_MAX_PAYLOAD_TWO', undefined)),
        debug: BooleanUtils.strToBoolWithDefault(this._configService.get<boolean>('NATS_DEBUG', undefined), undefined),
        verbose: BooleanUtils.strToBoolWithDefault(
          this._configService.get<boolean>('NATS_VERBOSE', undefined),
          undefined,
        ),
        queue: this._configService.get<string>('NATS_MS_USERS_QUEUE', undefined),
      },
    }

    if (natsClientConfig.name === undefined) {
      throw new InternalServerErrorException('Nats variable "name" is not found')
    }

    if (natsClientConfig.transport === undefined) {
      throw new InternalServerErrorException('Nats variable "transport" is not found')
    }

    if (natsClientConfig.options.servers === undefined) {
      throw new InternalServerErrorException('Nats variable "options servers" is not found')
    }

    if (isNaN(natsClientConfig.options.maxReconnectAttempts)) {
      throw new InternalServerErrorException('Nats variable "options maxReconnectAttempts" is not found')
    }

    if (natsClientConfig.options.reconnect === undefined) {
      throw new InternalServerErrorException('Nats variable "options reconnect" is not found')
    }

    if (natsClientConfig.options.waitOnFirstConnect === undefined) {
      throw new InternalServerErrorException('Nats variable "options waitOnFirstConnect" is not found')
    }

    if (natsClientConfig.options.debug === undefined) {
      throw new InternalServerErrorException('Nats variable "options debug" is not found')
    }

    if (natsClientConfig.options.verbose === undefined) {
      throw new InternalServerErrorException('Nats variable "options verbose" is not found')
    }

    if (natsClientConfig.options.max_payload === undefined) {
      throw new InternalServerErrorException('Nats variable "options max_payload" is not found')
    }

    if (isNaN(natsClientConfig.options.maxPayload)) {
      throw new InternalServerErrorException('Nats variable "options maxPayload" is not found')
    }

    if (natsClientConfig.options.queue === undefined) {
      throw new InternalServerErrorException('Nats variable "options queue" is not found')
    }

    return natsClientConfig
  }
}
