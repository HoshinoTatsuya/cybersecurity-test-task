import { Injectable } from '@nestjs/common'
import { ClientNats } from '@nestjs/microservices'

import { BaseException } from '../../../../../domain/exceptions'
import { BaseRequestsService } from '../base-request.service'
import { IMsUsersModuleOptionsFactory } from '../ms-users.interface'

import { route } from './constants'
import { IConfirmAvatar, ICreateUser, IGetInfoAboutMe, IUploadAvatar } from './interfaces/users'
import { ConfirmAvatarModel, CreateUserModel, GetInfoAboutMeModel, UploadAvatarModel } from './models/users'

@Injectable()
export class UsersRequest extends BaseRequestsService {
  private _msUsersConfig: IMsUsersModuleOptionsFactory

  public constructor(
    public msUsersConfigService: IMsUsersModuleOptionsFactory,
    public _client: ClientNats,
  ) {
    super(msUsersConfigService.logger.nats, msUsersConfigService.logger.axios, _client)
    this._msUsersConfig = msUsersConfigService
  }

  public async createUser(payload: ICreateUser): Promise<CreateUserModel> {
    try {
      const result = await this.natsRequestWithResponse<CreateUserModel, ICreateUser>({
        serviceName: route.users.nameService,
        method: route.users.methods.createUser,
        payload,
      })

      if (result instanceof BaseException) {
        return result
      }

      return new CreateUserModel()
    } catch (error) {
      return new BaseException().errorSubstitution({ error })
    }
  }

  public async uploadAvatar(payload: IUploadAvatar): Promise<UploadAvatarModel> {
    try {
      const result = await this.natsRequestWithResponse<UploadAvatarModel, IUploadAvatar>({
        serviceName: route.users.nameService,
        method: route.users.methods.uploadAvatar,
        payload,
      })

      if (result instanceof BaseException) {
        return result
      }

      return new UploadAvatarModel()
    } catch (error) {
      return new BaseException().errorSubstitution({ error })
    }
  }

  public async confirmAvatar(payload: IConfirmAvatar): Promise<ConfirmAvatarModel> {
    try {
      const result = await this.natsRequestWithResponse<ConfirmAvatarModel, IConfirmAvatar>({
        serviceName: route.users.nameService,
        method: route.users.methods.confirmAvatar,
        payload,
      })

      if (result instanceof BaseException) {
        return result
      }

      return new ConfirmAvatarModel()
    } catch (error) {
      return new BaseException().errorSubstitution({ error })
    }
  }

  public async getInfoAboutMe(payload: IGetInfoAboutMe): Promise<GetInfoAboutMeModel> {
    try {
      const result = await this.natsRequestWithResponse<GetInfoAboutMeModel, IGetInfoAboutMe>({
        serviceName: route.users.nameService,
        method: route.users.methods.getInfoAboutMe,
        payload,
      })

      if (result instanceof BaseException) {
        return result
      }

      return new GetInfoAboutMeModel()
    } catch (error) {
      return new BaseException().errorSubstitution({ error })
    }
  }
}
