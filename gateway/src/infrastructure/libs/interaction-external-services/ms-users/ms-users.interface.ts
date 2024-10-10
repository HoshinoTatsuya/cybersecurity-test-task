import { InjectionToken, ModuleMetadata, OptionalFactoryDependency, Type } from '@nestjs/common'

export interface IMsUsersModuleOptionsFactory {
  serviceName: string
  logger: {
    axios: boolean
    nats: boolean
  }
}

export interface MsUsersModuleOptionsFactory {
  createMsUsersOptions(): Promise<IMsUsersModuleOptionsFactory> | IMsUsersModuleOptionsFactory
}

export interface MsUsersModuleOptions extends IMsUsersModuleOptionsFactory {
  isGlobal?: boolean
}

export interface MsUsersModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<MsUsersModuleOptionsFactory>
  useClass?: Type<MsUsersModuleOptionsFactory>
  useFactory?: (...args: any[]) => Promise<IMsUsersModuleOptionsFactory> | IMsUsersModuleOptionsFactory
  inject?: (InjectionToken | OptionalFactoryDependency)[]
  isGlobal?: boolean
}
