import { Body, Controller, Delete, Get, Inject, Patch, Post, Query } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

import { Role } from '../../../domain/enums'
import { BaseException } from '../../../domain/exceptions'
import { BaseApiErrorResponse } from '../../../domain/exceptions/decorators/base-api-error-response.decorator'
import { IComments } from '../../../domain/interfaces/comments'
import { JwtUserInfoType } from '../../../infrastructure/libs/types/jwt-user-info.type'
import { allRoles } from '../../constants/utils.const'
import { AuthGuard } from '../../guards/decorators/auth-guard.decorator'
import { CurrentUser } from '../../guards/decorators/current-user.decorator'
import { COMMENTS_USECASE } from '../../providers/comments.provider'
import { externalRoutes } from '../routes'

import {
  CreateCommentDto,
  DeleteCommentDto,
  GetAllCommentsByUserDto,
  GetAllMyCommentsDto,
  UpdateCommentDto,
} from './dtos'
import {
  CreateCommentPresenter,
  DeleteCommentPresenter,
  GetAllCommentsByUserPresenter,
  GetAllMyCommentsPresenter,
  UpdateCommentPresenter,
} from './presenters'

@ApiTags(externalRoutes.msInfo.controllers.comments)
@Controller(externalRoutes.msInfo.controllers.comments)
export class CommentsController {
  public constructor(@Inject(COMMENTS_USECASE) private readonly _commentsUsecase: IComments) {}

  @Post(externalRoutes.methods.comments.createComment)
  @ApiBearerAuth()
  @AuthGuard()
  @ApiOperation({
    description: 'Create comment',
  })
  @ApiBody({
    required: true,
    type: CreateCommentDto,
  })
  @ApiCreatedResponse({ type: CreateCommentPresenter })
  @BaseApiErrorResponse()
  public async createComment(
    @CurrentUser(allRoles) user: JwtUserInfoType,
    @Body() data: CreateCommentDto,
  ): Promise<CreateCommentPresenter | BaseException> {
    const result = await this._commentsUsecase.createComment({ ...data, ...user })

    if (result instanceof BaseException) {
      return result
    }

    return new CreateCommentPresenter(result)
  }

  @Patch(externalRoutes.methods.comments.updateComment)
  @ApiBearerAuth()
  @AuthGuard()
  @ApiOperation({
    description: 'Update comment',
  })
  @ApiBody({
    type: UpdateCommentDto,
  })
  @ApiOkResponse({ type: UpdateCommentPresenter })
  @BaseApiErrorResponse()
  public async updateComment(
    @CurrentUser(allRoles) user: JwtUserInfoType,
    @Body() data: UpdateCommentDto,
  ): Promise<UpdateCommentPresenter | BaseException> {
    const result = await this._commentsUsecase.updateComment({ ...data, ...user })

    if (result instanceof BaseException) {
      return result
    }

    return new UpdateCommentPresenter(result)
  }

  @Delete(externalRoutes.methods.comments.deleteComment)
  @ApiBearerAuth()
  @AuthGuard()
  @ApiOperation({
    description: 'Delete comment',
  })
  @ApiBody({
    type: DeleteCommentDto,
  })
  @ApiResponse(BaseException.commentsSchema.COMMENTS_IS_NOT_FOUND)
  @ApiOkResponse({ type: DeleteCommentPresenter })
  @BaseApiErrorResponse()
  public async deleteComment(
    @CurrentUser(allRoles) user: JwtUserInfoType,
    @Body() data: DeleteCommentDto,
  ): Promise<DeleteCommentPresenter | BaseException> {
    const result = await this._commentsUsecase.deleteComment({ ...data, ...user })

    if (result instanceof BaseException) {
      return result
    }

    return new DeleteCommentPresenter(result)
  }

  @Get(externalRoutes.methods.comments.getAllMyComments)
  @ApiBearerAuth()
  @AuthGuard()
  @ApiOperation({
    description: 'Get all my comments',
  })
  @ApiOkResponse({ type: GetAllMyCommentsPresenter })
  @BaseApiErrorResponse()
  public async getAllMyComments(
    @CurrentUser(allRoles) user: JwtUserInfoType,
    @Query() data: GetAllMyCommentsDto,
  ): Promise<GetAllMyCommentsPresenter | BaseException> {
    const result = await this._commentsUsecase.getAllMyComments({ ...data, ...user })

    if (result instanceof BaseException) {
      return result
    }

    return new GetAllMyCommentsPresenter(result)
  }

  @Get(externalRoutes.methods.comments.getAllCommentsByUser)
  @ApiBearerAuth()
  @AuthGuard()
  @ApiOperation({
    description: 'Get all comments by user',
  })
  @ApiOkResponse({ type: GetAllCommentsByUserPresenter })
  @BaseApiErrorResponse()
  public async getAllCommentsByUser(
    @CurrentUser([Role.ADMIN]) user: JwtUserInfoType,
    @Query() data: GetAllCommentsByUserDto,
  ): Promise<GetAllCommentsByUserPresenter | BaseException> {
    const result = await this._commentsUsecase.getAllCommentsByUser(data)

    if (result instanceof BaseException) {
      return result
    }

    return new GetAllCommentsByUserPresenter(result)
  }
}
