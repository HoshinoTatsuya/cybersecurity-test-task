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

  public async createComment(data: ICreateComment): Promise<CreateCommentModel | BaseException> {}

  public async updateComment(data: IUpdateComment): Promise<UpdateCommentModel | BaseException> {}

  public async deleteComment(data: IDeleteComment): Promise<DeleteCommentModel | BaseException> {}

  public async getAllMyComments(data: IGetAllMyComments): Promise<GetAllMyCommentsModel | BaseException> {}

  public async getAllCommentsByUser(data: IGetAllCommentsByUser): Promise<GetAllCommentsByUserModel | BaseException> {}
}
