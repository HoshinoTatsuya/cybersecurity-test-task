import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger'

import { BaseException } from '../../../domain/exceptions'
import { BaseApiErrorResponse } from '../../../domain/exceptions/decorators/base-api-error-response.decorator'
import { IUsers } from '../../../domain/interfaces/users'
import { USERS_USECASE } from '../../providers/users.provider'
import { externalRoutes } from '../routes'

import { CreateUserDto, GetInfoAboutMeDto } from './dtos'
import { CreateUserPresenter, GetInfoAboutMePresenter } from './presenters'

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
  //  @ApiResponse(BaseException.categorySchema.SLUG_ALREADY_EXIST)
  @BaseApiErrorResponse()
  public async createUser(@Body() data: CreateUserDto): Promise<CreateUserPresenter | BaseException> {
    const result = await this._usersUsecase.createUser(data)

    if (result instanceof BaseException) {
      return result
    }

    return new CreateUserPresenter(result)
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
  @ApiOperation({
    description: 'Get info about me',
  })
  @ApiOkResponse({ type: GetInfoAboutMePresenter })
  @ApiResponse(BaseException.commonSchema.BAD_REQUEST)
  @BaseApiErrorResponse()
  public async getInfoAboutMe(@Query() data: GetInfoAboutMeDto): Promise<GetInfoAboutMePresenter | BaseException> {
    const result = await this._usersUsecase.getInfoAboutMe(data)

    if (result instanceof BaseException) {
      return result
    }

    return new GetInfoAboutMePresenter(result)
  }
}
