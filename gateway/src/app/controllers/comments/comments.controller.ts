import { Body, Controller, Delete, Get, Inject, Patch, Post } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger'

import { BaseException } from '../../../domain/exceptions'
import { BaseApiErrorResponse } from '../../../domain/exceptions/decorators/base-api-error-response.decorator'
import { IComments } from '../../../domain/interfaces/comments'
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

@Controller(externalRoutes.msInfo.controllers.comments)
export class CommentsController {
  public constructor(@Inject(COMMENTS_USECASE) private readonly _commentsUsecase: IComments) {}

  @Post(externalRoutes.methods.comments.createComment)
  @ApiOperation({
    description: 'Create comment',
  })
  @ApiBody({
    required: true,
    type: CreateCommentDto,
  })
  @ApiCreatedResponse({ type: CreateCommentPresenter })
  @BaseApiErrorResponse()
  public async createComment(@Body() data: CreateCommentDto): Promise<CreateCommentPresenter | BaseException> {
    const result = await this._commentsUsecase.createComment(data)

    if (result instanceof BaseException) {
      return result
    }

    return new CreateCommentPresenter(result)
  }

  @Patch(externalRoutes.methods.comments.updateComment)
  @ApiOperation({
    description: 'Update comment',
  })
  @ApiBody({
    type: UpdateCommentDto,
  })
  @ApiOkResponse({ type: UpdateCommentPresenter })
  @BaseApiErrorResponse()
  public async updateComment(@Body() data: UpdateCommentDto): Promise<UpdateCommentPresenter | BaseException> {
    const result = await this._commentsUsecase.updateComment(data)

    if (result instanceof BaseException) {
      return result
    }

    return new UpdateCommentPresenter(result)
  }

  @Delete(externalRoutes.methods.comments.deleteComment)
  @ApiOperation({
    description: 'Delete comment',
  })
  @ApiBody({
    type: DeleteCommentDto,
  })
  @ApiResponse(BaseException.commentsSchema.COMMENTS_IS_NOT_FOUND)
  @ApiOkResponse({ type: DeleteCommentPresenter })
  @BaseApiErrorResponse()
  public async deleteComment(@Body() data: DeleteCommentDto): Promise<DeleteCommentPresenter | BaseException> {
    const result = await this._commentsUsecase.deleteComment(data)

    if (result instanceof BaseException) {
      return result
    }

    return new DeleteCommentPresenter(result)
  }

  @Get(externalRoutes.methods.comments.getAllMyComments)
  @ApiOperation({
    description: 'Get all my comments',
  })
  @ApiOkResponse({ type: GetAllMyCommentsPresenter })
  @BaseApiErrorResponse()
  public async getAllMyComments(data: GetAllMyCommentsDto): Promise<GetAllMyCommentsPresenter | BaseException> {
    const result = await this._commentsUsecase.getAllMyComments(data)

    if (result instanceof BaseException) {
      return result
    }

    return new GetAllMyCommentsPresenter(result)
  }

  @Get(externalRoutes.methods.comments.getAllCommentsByUser)
  @ApiOperation({
    description: 'Get all comments by user',
  })
  @ApiOkResponse({ type: GetAllCommentsByUserPresenter })
  @BaseApiErrorResponse()
  public async getAllCommentsByUser(
    data: GetAllCommentsByUserDto,
  ): Promise<GetAllCommentsByUserPresenter | BaseException> {
    const result = await this._commentsUsecase.getAllCommentsByUser(data)

    if (result instanceof BaseException) {
      return result
    }

    return new GetAllCommentsByUserPresenter(result)
  }
}
