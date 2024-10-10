import { Injectable } from '@nestjs/common'

import { IMsCommentsService } from '../../infrastructure/libs/interaction-external-services/ms-comments/interfaces'
import { IMsUsersService } from '../../infrastructure/libs/interaction-external-services/ms-users/interfaces'
import { BaseException } from '../exceptions'
import { IComments } from '../interfaces/comments'
import {
  ICreateComment,
  IDeleteComment,
  IGetAllCommentsByUser,
  IGetAllMyComments,
  IUpdateComment,
} from '../interfaces/comments/methods'
import {
  CreateCommentModel,
  DeleteCommentModel,
  GetAllCommentsByUserModel,
  GetAllMyCommentsModel,
  UpdateCommentModel,
} from '../models/comments'

@Injectable()
export class CommentsUsecase implements IComments {
  public constructor(
    private readonly _usersService: IMsUsersService,
    private readonly _commentsService: IMsCommentsService,
  ) {}

  public async createComment(data: ICreateComment): Promise<CreateCommentModel | BaseException> {
    const result = await this._commentsService.comments.createComment(data)

    if (result instanceof BaseException) {
      return result
    }

    return new CreateCommentModel(result)
  }

  public async updateComment(data: IUpdateComment): Promise<UpdateCommentModel | BaseException> {
    const result = await this._commentsService.comments.updateComment(data)

    if (result instanceof BaseException) {
      return result
    }

    return new UpdateCommentModel(result)
  }

  public async deleteComment(data: IDeleteComment): Promise<DeleteCommentModel | BaseException> {
    const result = await this._commentsService.comments.deleteComment(data)

    if (result instanceof BaseException) {
      return result
    }

    return new DeleteCommentModel(result)
  }

  public async getAllMyComments(data: IGetAllMyComments): Promise<GetAllMyCommentsModel | BaseException> {
    const result = await this._commentsService.comments.getAllMyComments(data)

    if (result instanceof BaseException) {
      return result
    }

    return new GetAllMyCommentsModel(result)
  }

  public async getAllCommentsByUser(data: IGetAllCommentsByUser): Promise<GetAllCommentsByUserModel | BaseException> {
    const result = await this._commentsService.comments.getAllCommentsByUser(data)

    if (result instanceof BaseException) {
      return result
    }

    return new GetAllCommentsByUserModel(result)
  }
}
