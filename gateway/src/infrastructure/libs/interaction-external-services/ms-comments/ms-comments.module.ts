import { DynamicModule, Module, Provider } from '@nestjs/common'

import { MS_COMMENTS_MODULE_OPTIONS } from './ms-comments.constants'
import {
  MsCommentsModuleAsyncOptions,
  MsCommentsModuleOptions,
  MsCommentsModuleOptionsFactory,
} from './ms-comments.interface'
import { MsCommentsService } from './ms-comments.service'

@Module({})
export class MsCommentsModule {
  public static forRoot(options: MsCommentsModuleOptions): DynamicModule {
    return {
      module: MsCommentsModule,
      providers: [MsCommentsService, { provide: MS_COMMENTS_MODULE_OPTIONS, useValue: options }],
      exports: [MsCommentsService],
      global: options?.isGlobal ?? true,
    }
  }

  public static forRootAsync(options: MsCommentsModuleAsyncOptions): DynamicModule {
    return {
      module: MsCommentsModule,
      imports: options.imports ?? [],
      providers: [MsCommentsService, ...this._createAsyncProviders(options)],
      exports: [MsCommentsService],
      global: options?.isGlobal ?? true,
    }
  }

  private static _createAsyncProviders(options: MsCommentsModuleAsyncOptions): Provider[] {
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

  private static _createAsyncOptionsProvider(options: MsCommentsModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: MS_COMMENTS_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject,
      }
    }

    return {
      provide: MS_COMMENTS_MODULE_OPTIONS,
      useFactory: async (optionsFactory: MsCommentsModuleOptionsFactory) =>
        await optionsFactory.createMsCommentsOptions(),
      inject: [options.useExisting || options.useClass],
    }
  }
}
