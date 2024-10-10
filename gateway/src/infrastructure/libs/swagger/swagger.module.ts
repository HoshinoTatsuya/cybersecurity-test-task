import { SwaggerModuleAsyncOptions } from '@libs/shared/common/swagger/interface-inject/swagger.interface'
import { DynamicModule, Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'

@Module({})
export class SwaggerModule {
  public static forRootAsync(options: SwaggerModuleAsyncOptions): DynamicModule {
    return {
      module: SwaggerModule,
      imports: options.imports ?? [],
      controllers: [],
      providers: [],
      exports: [ClientsModule],
      global: options?.isGlobal ?? true,
    }
  }
}
