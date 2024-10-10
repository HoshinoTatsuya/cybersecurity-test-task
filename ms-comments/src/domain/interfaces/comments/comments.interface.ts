import { BaseException } from '../../exceptions'
import {
  CreateCommentModel,
  DeleteCommentModel,
  GetAllCommentsByUserModel,
  GetAllMyCommentsModel,
  UpdateCommentModel,
} from '../../models/comments'

import { ICreateComment, IDeleteComment, IGetAllCommentsByUser, IGetAllMyComments, IUpdateComment } from './methods'

export abstract class IComments {
  public abstract createComment(data: ICreateComment): Promise<CreateCommentModel | BaseException>

  public abstract updateComment(data: IUpdateComment): Promise<UpdateCommentModel | BaseException>

  public abstract deleteComment(data: IDeleteComment): Promise<DeleteCommentModel | BaseException>

  public abstract getAllMyComments(data: IGetAllMyComments): Promise<GetAllMyCommentsModel | BaseException>

  public abstract getAllCommentsByUser(data: IGetAllCommentsByUser): Promise<GetAllCommentsByUserModel | BaseException>
}
