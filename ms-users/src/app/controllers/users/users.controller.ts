import { ClassSerializerInterceptor, Controller, Inject, UseInterceptors } from '@nestjs/common'

import { BaseException } from '../../../domain/exceptions'
import { IUsers } from '../../../domain/interfaces/users'
import { CustomMessagePattern } from '../../../infrastructure/libs/nats/custom-decorators/custom-message-pattern.decorator'
import { USERS_USECASE } from '../../providers/users.provider'
import { internalsRoutes } from '../routes'

import { CreateUserDto, GetInfoAboutMeDto, LoginDto, VerifyTokenDto } from './dtos'
import { CreateUserPresenter, GetInfoAboutMePresenter, LoginPresenter, VerifyTokenPresenter } from './presenters'

@Controller()
export class UsersController {
  public constructor(@Inject(USERS_USECASE) private readonly _usersUsecase: IUsers) {}

  @CustomMessagePattern(internalsRoutes.msInfo.msName, internalsRoutes.methods.users.createUser)
  @UseInterceptors(ClassSerializerInterceptor)
  public async createUser(data: CreateUserDto): Promise<CreateUserPresenter | BaseException> {
    const result = await this._usersUsecase.createUser(data)

    if (result instanceof BaseException) {
      return result
    }

    return new CreateUserPresenter(result)
  }

  @CustomMessagePattern(internalsRoutes.msInfo.msName, internalsRoutes.methods.auth.login)
  @UseInterceptors(ClassSerializerInterceptor)
  public async login(data: LoginDto): Promise<LoginPresenter | BaseException> {
    const result = await this._usersUsecase.login(data)

    if (result instanceof BaseException) {
      return result
    }

    return new LoginPresenter(result)
  }

  //  @CustomMessagePattern(internalsRoutes.msInfo.msName, internalsRoutes.methods.users.uploadAvatar)
  //  @UseInterceptors(ClassSerializerInterceptor)
  //  public async uploadAvatar(data: UploadAvatarDto): Promise<UploadAvatarPresenter | BaseException> {
  //    //    const result = await this._usersUsecase.uploadAvatar(data)
  //    //
  //    //    if (result instanceof BaseException) {
  //    //      return result
  //    //    }
  //    //
  //    //    return new UploadAvatarPresenter(result)
  //  }

  //  @CustomMessagePattern(internalsRoutes.msInfo.msName, internalsRoutes.methods.users.confirmAvatar)
  //  @UseInterceptors(ClassSerializerInterceptor)
  //  public async confirmAvatar(data: ConfirmAvatarDto): Promise<UploadAvatarPresenter | BaseException> {
  //    //    const result = await this._usersUsecase.confirmAvatar(data)
  //    //
  //    //    if (result instanceof BaseException) {
  //    //      return result
  //    //    }
  //    //
  //    //    return new UploadAvatarPresenter(result)
  //  }

  @CustomMessagePattern(internalsRoutes.msInfo.msName, internalsRoutes.methods.users.getInfoAboutMe)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getInfoAboutMe(data: GetInfoAboutMeDto): Promise<GetInfoAboutMePresenter | BaseException> {
    const result = await this._usersUsecase.getInfoAboutMe(data)

    if (result instanceof BaseException) {
      return result
    }

    return new GetInfoAboutMePresenter(result)
  }

  @CustomMessagePattern(internalsRoutes.msInfo.msName, internalsRoutes.methods.auth.verifyToken)
  @UseInterceptors(ClassSerializerInterceptor)
  public async verifyToken(data: VerifyTokenDto): Promise<VerifyTokenPresenter | BaseException> {
    const result = await this._usersUsecase.verifyToken(data)

    if (result instanceof BaseException) {
      return result
    }

    return new VerifyTokenPresenter(result)
  }
}
