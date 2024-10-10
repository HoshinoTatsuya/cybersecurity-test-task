import { Injectable } from '@nestjs/common'

import { BaseException } from '../exceptions'
import { IUsers } from '../interfaces/users'
import { ICreateUser, IGetInfoAboutMe } from '../interfaces/users/methods'
import { CreateUserModel, GetInfoAboutMeModel } from '../models/users'
import { IUsersRepository } from '../repositories/users/users.repository'

@Injectable()
export class UsersUsecase implements IUsers {
  public constructor(private readonly _usersRepository: IUsersRepository) {}

  public async createUser(data: ICreateUser): Promise<CreateUserModel | BaseException> {
    const result = await this._usersRepository.createUser(data)

    if (result instanceof BaseException) {
      return result
    }

    return new CreateUserModel(result)
  }

  public async uploadAvatar(): Promise<void> {}

  public async confirmAvatar(): Promise<void> {}

  public async getInfoAboutMe(data: IGetInfoAboutMe): Promise<GetInfoAboutMeModel | BaseException> {
    const result = await this._usersRepository.getOneUser({ userId: data.userId })

    if (result instanceof BaseException) {
      return result
    }

    return new GetInfoAboutMeModel(result)
  }
}
