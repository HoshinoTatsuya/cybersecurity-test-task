import { Body, Controller, Get, Inject, Post } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

import { BaseException } from '../../../domain/exceptions'
import { BaseApiErrorResponse } from '../../../domain/exceptions/decorators/base-api-error-response.decorator'
import { IUsers } from '../../../domain/interfaces/users'
import { JwtUserInfoType } from '../../../infrastructure/libs/types/jwt-user-info.type'
import { allRoles } from '../../constants/utils.const'
import { AuthGuard } from '../../guards/decorators/auth-guard.decorator'
import { CurrentUser } from '../../guards/decorators/current-user.decorator'
import { USERS_USECASE } from '../../providers/users.provider'
import { externalRoutes } from '../routes'

import { CreateUserDto, LoginDto } from './dtos'
import { CreateUserPresenter, GetInfoAboutMePresenter, LoginPresenter } from './presenters'

@ApiTags(externalRoutes.msInfo.controllers.users)
@Controller(externalRoutes.msInfo.controllers.users)
export class UsersController {
  public constructor(@Inject(USERS_USECASE) private readonly _usersUsecase: IUsers) {}

  @Post(externalRoutes.methods.users.createUser)
  @ApiOperation({
    description: 'Create user',
  })
  @ApiBody({
    required: true,
    type: CreateUserDto,
  })
  @ApiCreatedResponse({ type: CreateUserPresenter })
  @BaseApiErrorResponse()
  public async createUser(@Body() data: CreateUserDto): Promise<CreateUserPresenter | BaseException> {
    const result = await this._usersUsecase.createUser(data)

    if (result instanceof BaseException) {
      return result
    }

    return new CreateUserPresenter(result)
  }

  @Post(externalRoutes.methods.auth.login)
  @ApiOperation({
    description: 'Login user',
  })
  @ApiBody({
    required: true,
    type: LoginDto,
  })
  @ApiCreatedResponse({ type: LoginPresenter })
  @BaseApiErrorResponse()
  public async login(@Body() data: LoginDto): Promise<LoginPresenter | BaseException> {
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

  @Get(externalRoutes.methods.users.getInfoAboutMe)
  @ApiBearerAuth()
  @AuthGuard()
  @ApiOperation({
    description: 'Get info about me',
  })
  @ApiOkResponse({ type: GetInfoAboutMePresenter })
  @ApiResponse(BaseException.commonSchema.BAD_REQUEST)
  @BaseApiErrorResponse()
  public async getInfoAboutMe(
    @CurrentUser(allRoles) user: JwtUserInfoType,
  ): Promise<GetInfoAboutMePresenter | BaseException> {
    const result = await this._usersUsecase.getInfoAboutMe(user)

    if (result instanceof BaseException) {
      return result
    }

    return new GetInfoAboutMePresenter(result)
  }
}
