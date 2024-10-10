import { InjectionToken, ModuleMetadata, OptionalFactoryDependency, Type } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

import { LanguagesEnum } from './exceptions/enums'

export interface IJWTCustomModuleOptionsFactory {
  secret?: string | Buffer
  signOptions?: jwt.SignOptions
  publicKey?: string | Buffer
  privateKey?: jwt.Secret
  accessTokenExpire: string
  refreshTokenExpire: string
  language: LanguagesEnum
  logger: {
    axios: boolean
    nats: boolean
  }
}

export interface JWTCustomModuleOptionsFactory {
  createJWTCustomModuleOptions(): Promise<IJWTCustomModuleOptionsFactory> | IJWTCustomModuleOptionsFactory
}

export interface JWTCustomModuleOptions extends IJWTCustomModuleOptionsFactory {
  isGlobal?: boolean
}

export interface JWTCustomModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<JWTCustomModuleOptionsFactory>
  useClass?: Type<JWTCustomModuleOptionsFactory>
  useFactory?: (...args: any[]) => Promise<IJWTCustomModuleOptionsFactory> | IJWTCustomModuleOptionsFactory
  inject?: (InjectionToken | OptionalFactoryDependency)[]
  isGlobal?: boolean
}
