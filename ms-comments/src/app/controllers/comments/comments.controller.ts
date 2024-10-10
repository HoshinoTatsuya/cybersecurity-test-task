import { ClassSerializerInterceptor, Controller, Inject, UseInterceptors } from '@nestjs/common'

import { BaseException } from '../../../domain/exceptions'
import { IComments } from '../../../domain/interfaces/comments'
import { CustomMessagePattern } from '../../../infrastructure/libs/nats/custom-decorators/custom-message-pattern.decorator'
import { COMMENTS_USECASE } from '../../providers/comments.provider'
import { internalsRoutes } from '../routes'

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

@Controller()
export class CommentsController {
  public constructor(@Inject(COMMENTS_USECASE) private readonly _commentsUsecase: IComments) {}

  @CustomMessagePattern(internalsRoutes.msInfo.msName, internalsRoutes.methods.comments.createComment)
  @UseInterceptors(ClassSerializerInterceptor)
  public async createComment(data: CreateCommentDto): Promise<CreateCommentPresenter | BaseException> {
    const result = await this._commentsUsecase.createComment(data)

    if (result instanceof BaseException) {
      return result
    }

    return new CreateCommentPresenter(result)
  }

  @CustomMessagePattern(internalsRoutes.msInfo.msName, internalsRoutes.methods.comments.updateComment)
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateComment(data: UpdateCommentDto): Promise<UpdateCommentPresenter | BaseException> {
    const result = await this._commentsUsecase.updateComment(data)

    if (result instanceof BaseException) {
      return result
    }

    return new UpdateCommentPresenter(result)
  }

  @CustomMessagePattern(internalsRoutes.msInfo.msName, internalsRoutes.methods.comments.deleteComment)
  @UseInterceptors(ClassSerializerInterceptor)
  public async deleteComment(data: DeleteCommentDto): Promise<DeleteCommentPresenter | BaseException> {
    const result = await this._commentsUsecase.deleteComment(data)

    if (result instanceof BaseException) {
      return result
    }

    return new DeleteCommentPresenter(result)
  }

  @CustomMessagePattern(internalsRoutes.msInfo.msName, internalsRoutes.methods.comments.getAllMyComments)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getAllMyComments(data: GetAllMyCommentsDto): Promise<GetAllMyCommentsPresenter | BaseException> {
    const result = await this._commentsUsecase.getAllMyComments(data)

    if (result instanceof BaseException) {
      return result
    }

    return new GetAllMyCommentsPresenter(result)
  }

  @CustomMessagePattern(internalsRoutes.msInfo.msName, internalsRoutes.methods.comments.getAllCommentsByUser)
  @UseInterceptors(ClassSerializerInterceptor)
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
