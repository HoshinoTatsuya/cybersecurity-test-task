import { DynamicModule, Module, Provider } from '@nestjs/common'

import { JWT_CUSTOM_MODULE_OPTIONS, JWT_MODULE_OPTIONS } from './constants'
import {
  IJWTCustomModuleOptionsFactory,
  JWTCustomModuleAsyncOptions,
  JWTCustomModuleOptions,
  JWTCustomModuleOptionsFactory,
} from './jwt-options.interface'
import { JwtCustomService } from './services/jwt.service'

@Module({})
export class JWTCustomModule {
  public static forRoot(options: JWTCustomModuleOptions): DynamicModule {
    return {
      module: JWTCustomModule,
      providers: [JwtCustomService, { provide: JWT_CUSTOM_MODULE_OPTIONS, useValue: options }],
      exports: [JwtCustomService],
      global: options?.isGlobal ?? true,
    }
  }

  public static forRootAsync(options: JWTCustomModuleAsyncOptions): DynamicModule {
    return {
      module: JWTCustomModule,
      imports: options.imports ?? [],
      providers: [JwtCustomService, ...this._createAsyncProviders(options)],
      exports: [JwtCustomService],
      global: options?.isGlobal ?? true,
    }
  }

  private static _createAsyncProviders(options: JWTCustomModuleAsyncOptions): Provider[] {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting')
    }

    if (options.useExisting || options.useFactory) {
      return [this._createAsyncOptionsProvider(options), this._createJwtBaseAsyncOptionsProvider(options)]
    }

    return [
      this._createAsyncOptionsProvider(options),
      this._createJwtBaseAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ]
  }

  private static _createAsyncOptionsProvider(options: JWTCustomModuleAsyncOptions): Provider {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting')
    }

    if (options.useFactory) {
      return {
        provide: JWT_CUSTOM_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject,
      }
    }

    return {
      provide: JWT_CUSTOM_MODULE_OPTIONS,
      useFactory: async (optionsFactory: JWTCustomModuleOptionsFactory) =>
        await optionsFactory.createJWTCustomModuleOptions(),
      inject: [options.useExisting || options.useClass],
    }
  }

  private static _createJwtBaseAsyncOptionsProvider(options: JWTCustomModuleAsyncOptions): Provider {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting')
    }

    if (options.useFactory) {
      return {
        provide: JWT_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      }
    }

    return {
      provide: JWT_MODULE_OPTIONS,
      useFactory: async (optionsFactory: JWTCustomModuleOptionsFactory): Promise<IJWTCustomModuleOptionsFactory> =>
        await optionsFactory.createJWTCustomModuleOptions(),
      inject: [options.useExisting || options.useClass],
    }
  }
}
