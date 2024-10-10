import { Injectable } from '@nestjs/common'

import { IMsCommentsService } from '../../infrastructure/libs/interaction-external-services/ms-comments/interfaces'
import { IMsUsersService } from '../../infrastructure/libs/interaction-external-services/ms-users/interfaces'
import { BaseException } from '../exceptions'
import { IUsers } from '../interfaces/users'
import { ICreateUser, IGetInfoAboutMe } from '../interfaces/users/methods'
import { CreateUserModel, GetInfoAboutMeModel } from '../models/users'

@Injectable()
export class UsersUsecase implements IUsers {
  public constructor(
    private readonly _usersService: IMsUsersService,
    private readonly _commentsService: IMsCommentsService,
  ) {}

  public async createUser(data: ICreateUser): Promise<CreateUserModel | BaseException> {}

  public async uploadAvatar(): Promise<void> {}

  public async confirmAvatar(): Promise<void> {}

  public async getInfoAboutMe(data: IGetInfoAboutMe): Promise<GetInfoAboutMeModel | BaseException> {}
}
