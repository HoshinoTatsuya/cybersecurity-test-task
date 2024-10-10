import { Injectable } from '@nestjs/common'

import { IMsCommentsService } from '../../infrastructure/libs/interaction-external-services/ms-comments/interfaces'
import { IMsUsersService } from '../../infrastructure/libs/interaction-external-services/ms-users/interfaces'
import { BaseException } from '../exceptions'
import { IUsers } from '../interfaces/users'
import { ICreateUser, IGetInfoAboutMe, ILogin } from '../interfaces/users/methods'
import { IVerifyToken } from '../interfaces/users/methods/verify-token.interface'
import { CreateUserModel, GetInfoAboutMeModel, LoginModel, VerifyTokenModel } from '../models/users'

@Injectable()
export class UsersUsecase implements IUsers {
  public constructor(
    private readonly _usersService: IMsUsersService,
    private readonly _commentsService: IMsCommentsService,
  ) {}

  public async createUser(data: ICreateUser): Promise<CreateUserModel | BaseException> {
    const result = await this._usersService.users.createUser(data)

    if (result instanceof BaseException) {
      return result
    }

    return new CreateUserModel(result)
  }

  public async login(data: ILogin): Promise<LoginModel | BaseException> {
    const result = await this._usersService.auth.login(data)

    if (result instanceof BaseException) {
      return result
    }

    return new LoginModel(result)
  }

  public async uploadAvatar(): Promise<void> {}

  public async confirmAvatar(): Promise<void> {}

  public async getInfoAboutMe(data: IGetInfoAboutMe): Promise<GetInfoAboutMeModel | BaseException> {
    const result = await this._usersService.users.getInfoAboutMe({ userId: data.userId })

    if (result instanceof BaseException) {
      return result
    }

    return new GetInfoAboutMeModel(result)
  }

  public async verifyToken(data: IVerifyToken): Promise<VerifyTokenModel | BaseException> {
    const result = await this._usersService.auth.verifyToken(data)

    if (result instanceof BaseException) {
      return result
    }

    return new VerifyTokenModel(result)
  }
}
