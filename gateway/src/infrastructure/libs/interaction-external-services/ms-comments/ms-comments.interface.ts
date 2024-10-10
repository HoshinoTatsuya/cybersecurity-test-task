import { InjectionToken, ModuleMetadata, OptionalFactoryDependency, Type } from '@nestjs/common'

export interface IMsCommentsModuleOptionsFactory {
  serviceName: string
  logger: {
    axios: boolean
    nats: boolean
  }
}

export interface MsCommentsModuleOptionsFactory {
  createMsCommentsOptions(): Promise<IMsCommentsModuleOptionsFactory> | IMsCommentsModuleOptionsFactory
}

export interface MsCommentsModuleOptions extends IMsCommentsModuleOptionsFactory {
  isGlobal?: boolean
}

export interface MsCommentsModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<MsCommentsModuleOptionsFactory>
  useClass?: Type<MsCommentsModuleOptionsFactory>
  useFactory?: (...args: any[]) => Promise<IMsCommentsModuleOptionsFactory> | IMsCommentsModuleOptionsFactory
  inject?: (InjectionToken | OptionalFactoryDependency)[]
  isGlobal?: boolean
}
