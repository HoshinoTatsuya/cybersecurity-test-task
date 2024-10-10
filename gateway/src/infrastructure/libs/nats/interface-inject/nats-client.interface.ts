import { InjectionToken, ModuleMetadata, OptionalFactoryDependency, Type } from '@nestjs/common'
import { Transport } from '@nestjs/microservices'
import { NatsOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface'

interface ICustomSettingsNatsClient {
  servers: string[]
  reconnect: boolean
  maxReconnectAttempts: number
  waitOnFirstConnect: boolean
  // eslint-disable-next-line @typescript-eslint/naming-convention
  max_payload: string
  maxPayload: number
  debug: boolean
  verbose: boolean
  queue: string
}

export interface INatsClientModuleOptionsFactory {
  name: string
  transport: Transport
  options: Pick<NatsOptions, 'options'> & ICustomSettingsNatsClient
}

export interface NatsClientModuleOptionsFactory {
  createNatsClientOptions(): Promise<INatsClientModuleOptionsFactory> | INatsClientModuleOptionsFactory
}

export interface NatsClientModuleOptions extends INatsClientModuleOptionsFactory {
  isGlobal?: boolean
}

export interface NatsClientModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<NatsClientModuleOptionsFactory>
  useClass?: Type<NatsClientModuleOptionsFactory>
  useFactory?: (...args: any[]) => Promise<INatsClientModuleOptionsFactory> | INatsClientModuleOptionsFactory
  inject?: (InjectionToken | OptionalFactoryDependency)[]
  isGlobal?: boolean
}
