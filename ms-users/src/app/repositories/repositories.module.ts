import { DynamicModule, Global, Module, Type } from '@nestjs/common'
import { TypeOrmModule, TypeOrmOptionsFactory } from '@nestjs/typeorm'

import { UsersEntity } from '../entities/users/users.entity'

import { UsersRepository } from './users/users.repository'

@Global()
@Module({})
export class RepositoriesModule {
  public static register(options: Type<TypeOrmOptionsFactory>): DynamicModule {
    return {
      module: RepositoriesModule,
      imports: [TypeOrmModule.forRootAsync({ useClass: options }), TypeOrmModule.forFeature([UsersEntity])],
      providers: [UsersRepository],
      exports: [TypeOrmModule, UsersRepository],
    }
  }
}
