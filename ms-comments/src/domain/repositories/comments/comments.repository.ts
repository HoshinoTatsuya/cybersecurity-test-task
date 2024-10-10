import { BaseException } from '../../exceptions'

import {
  ICreateComment,
  IDeleteComment,
  IDropExpiredComments,
  IGetAllComments,
  IGetComment,
  IUpdateComment,
} from './interfaces'
import {
  CreateCommentModel,
  DeleteCommentModel,
  GetAllCommentsModel,
  GetCommentModel,
  GetExpiredCommentsModel,
  UpdateCommentModel,
} from './models'

export abstract class ICommentsRepository {
  public abstract createComment(data: ICreateComment): Promise<CreateCommentModel | BaseException>

  public abstract updateComment(data: IUpdateComment): Promise<UpdateCommentModel | BaseException>

  public abstract deleteComment(data: IDeleteComment): Promise<DeleteCommentModel | BaseException>

  public abstract getAllComments(data: IGetAllComments): Promise<GetAllCommentsModel | BaseException>

  public abstract getComment(data: IGetComment): Promise<GetCommentModel | BaseException>

  public abstract getExpiredComments(): Promise<GetExpiredCommentsModel | BaseException>

  public abstract dropExpiredComments(data: IDropExpiredComments): Promise<void | BaseException>
}
