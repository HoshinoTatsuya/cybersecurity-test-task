import { DynamicModule, Module, Provider } from '@nestjs/common'

import { MS_USERS_MODULE_OPTIONS } from './ms-users.constants'
import { MsUsersModuleOptionsFactory, MsUsersModuleAsyncOptions, MsUsersModuleOptions } from './ms-users.interface'
import { MsUsersService } from './ms-users.service'

@Module({})
export class MsUsersModule {
  public static forRoot(options: MsUsersModuleOptions): DynamicModule {
    return {
      module: MsUsersModule,
      providers: [MsUsersService, { provide: MS_USERS_MODULE_OPTIONS, useValue: options }],
      exports: [MsUsersService],
      global: options?.isGlobal ?? true,
    }
  }

  public static forRootAsync(options: MsUsersModuleAsyncOptions): DynamicModule {
    return {
      module: MsUsersModule,
      imports: options.imports ?? [],
      providers: [MsUsersService, ...this._createAsyncProviders(options)],
      exports: [MsUsersService],
      global: options?.isGlobal ?? true,
    }
  }

  private static _createAsyncProviders(options: MsUsersModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this._createAsyncOptionsProvider(options)]
    }

    return [
      this._createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ]
  }

  private static _createAsyncOptionsProvider(options: MsUsersModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: MS_USERS_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject,
      }
    }

    return {
      provide: MS_USERS_MODULE_OPTIONS,
      useFactory: async (optionsFactory: MsUsersModuleOptionsFactory) => await optionsFactory.createMsUsersOptions(),
      inject: [options.useExisting || options.useClass],
    }
  }
}
