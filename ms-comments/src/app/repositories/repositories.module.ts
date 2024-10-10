import { DynamicModule, Global, Module, Type } from '@nestjs/common'
import { TypeOrmModule, TypeOrmOptionsFactory } from '@nestjs/typeorm'

import { CommentsEntity } from '../entities/comments/comments.entity'

import { CommentsRepository } from './comments/comments.repository'

@Global()
@Module({})
export class RepositoriesModule {
  public static register(options: Type<TypeOrmOptionsFactory>): DynamicModule {
    return {
      module: RepositoriesModule,
      imports: [TypeOrmModule.forRootAsync({ useClass: options }), TypeOrmModule.forFeature([CommentsEntity])],
      providers: [CommentsRepository],
      exports: [TypeOrmModule, CommentsRepository],
    }
  }
}
