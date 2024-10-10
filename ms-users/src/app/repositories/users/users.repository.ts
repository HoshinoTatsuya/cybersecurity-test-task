import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BaseException } from '../../../domain/exceptions'
import { ICreateUser, IGetOneUser } from '../../../domain/repositories/users/interfaces'
import { CreateUserModel, GetOneUserModel } from '../../../domain/repositories/users/models'
import { IUsersRepository } from '../../../domain/repositories/users/users.repository'
import { UsersEntity } from '../../entities/users/users.entity'

@Injectable()
export class UsersRepository implements IUsersRepository {
  public constructor(
    @InjectRepository(UsersEntity)
    private readonly _usersRepository: Repository<UsersEntity>,
  ) {}

  public async createUser(data: ICreateUser): Promise<CreateUserModel | BaseException> {
    try {
      const result = await this._usersRepository.save(data)

      return new CreateUserModel(result)
    } catch (error) {
      return new BaseException().errorSubstitution({ error })
    }
  }

  public async getOneUser(data: IGetOneUser): Promise<GetOneUserModel | BaseException> {
    try {
      const fields = UsersEntity.getFieldsName()

      const result = await this._usersRepository
        .createQueryBuilder(UsersEntity.tableName)
        .where(`${fields.id} = :userId`, { userId: data.userId })
        .getOne()

      if (!result) {
        return new BaseException(BaseException.users.EN.USER_IS_NOT_FOUND)
      }

      return new GetOneUserModel(result)
    } catch (error) {
      return new BaseException().errorSubstitution({ error })
    }
  }
}
