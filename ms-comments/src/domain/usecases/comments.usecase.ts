import { Injectable } from '@nestjs/common'
import { automaticDeletionDate } from '../constants'

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
import { ICommentsRepository } from '../repositories/comments/comments.repository'

@Injectable()
export class CommentsUsecase implements IComments {
  public constructor(private readonly _commentsRepository: ICommentsRepository) {}

  public async createComment(data: ICreateComment): Promise<CreateCommentModel | BaseException> {
    let commentDeletionDate = undefined

    if (data.automaticDeletionDate) {
      commentDeletionDate = automaticDeletionDate[data.automaticDeletionDate]
    }
    const result = await this._commentsRepository.createComment({
      text: data.text,
      userId: data.userId,
      automaticDeletionDate: commentDeletionDate,
    })

    if (result instanceof BaseException) {
      return result
    }

    return new CreateCommentModel(result)
  }

  public async updateComment(data: IUpdateComment): Promise<UpdateCommentModel | BaseException> {
    const comment = await this._commentsRepository.getComment(data)

    if (comment instanceof BaseException) {
      return comment
    }

    const resultOperation = await this._commentsRepository.updateComment({ commentId: comment.id, text: data.text })

    if (resultOperation instanceof BaseException) {
      return resultOperation
    }

    if (!resultOperation.result) {
      return new BaseException(BaseException.comments.EN.FAILED_TO_UPDATE_COMMENT)
    }

    return new UpdateCommentModel(resultOperation)
  }

  public async deleteComment(data: IDeleteComment): Promise<DeleteCommentModel | BaseException> {
    const comment = await this._commentsRepository.getComment(data)

    if (comment instanceof BaseException) {
      return comment
    }

    if (comment.userId !== data.userId) {
      return new BaseException(BaseException.comments.EN.COMMENTS_IS_NOT_FOUND)
    }

    const resultOperation = await this._commentsRepository.deleteComment(data)

    if (resultOperation instanceof BaseException) {
      return resultOperation
    }

    if (!resultOperation.result) {
      return new BaseException(BaseException.comments.EN.FAILED_TO_UPDATE_COMMENT)
    }

    return new DeleteCommentModel(resultOperation)
  }

  public async getAllMyComments(data: IGetAllMyComments): Promise<GetAllMyCommentsModel | BaseException> {
    const result = await this._commentsRepository.getAllComments(data)

    if (result instanceof BaseException) {
      return result
    }

    return new GetAllMyCommentsModel(result)
  }

  public async getAllCommentsByUser(data: IGetAllCommentsByUser): Promise<GetAllCommentsByUserModel | BaseException> {
    const result = await this._commentsRepository.getAllComments(data)

    if (result instanceof BaseException) {
      return result
    }

    return new GetAllCommentsByUserModel(result)
  }
}
