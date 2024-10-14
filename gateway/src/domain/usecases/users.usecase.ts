import { Injectable } from '@nestjs/common'

import { IMsCommentsService } from '../../infrastructure/libs/interaction-external-services/ms-comments/interfaces'
import { IMsUsersService } from '../../infrastructure/libs/interaction-external-services/ms-users/interfaces'
import { BaseException } from '../exceptions'
import { IUsers } from '../interfaces/users'
import { ICreateUser, IGetInfoAboutMe, ILogin, IUploadAvatar, IVerifyToken } from '../interfaces/users/methods'
import { CreateUserModel, GetInfoAboutMeModel, LoginModel, UploadAvatarModel, VerifyTokenModel } from '../models/users'

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

  public async uploadAvatar(data: IUploadAvatar): Promise<UploadAvatarModel | BaseException> {
    console.log(data.file)
    const fileData = data.file.buffer.toString('base64')
    const fileName = data.file.originalname
    const result = await this._usersService.users.uploadAvatar({
      userId: data.userId,
      fileData,
      fileName,
    })

    if (result instanceof BaseException) {
      return result
    }

    return new UploadAvatarModel(result)
  }

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
