import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { BaseException } from '../../../domain/exceptions'
import { ICommentsRepository } from '../../../domain/repositories/comments/comments.repository'
import {
  ICreateComment,
  IDeleteComment,
  IDropExpiredComments,
  IGetAllComments,
  IGetComment,
  IUpdateComment,
} from '../../../domain/repositories/comments/interfaces'
import {
  CreateCommentModel,
  DeleteCommentModel,
  GetAllCommentsModel,
  GetCommentModel,
  GetExpiredCommentsModel,
  UpdateCommentModel,
} from '../../../domain/repositories/comments/models'
import { CommentsEntity } from '../../entities/comments/comments.entity'

@Injectable()
export class CommentsRepository implements ICommentsRepository {
  public constructor(
    @InjectRepository(CommentsEntity)
    private readonly _commentsRepository: Repository<CommentsEntity>,
  ) {}

  public async createComment(data: ICreateComment): Promise<CreateCommentModel | BaseException> {
    try {
      console.log(data)
      const result = await this._commentsRepository.save(data)

      return new CreateCommentModel(result)
    } catch (error) {
      return new BaseException().errorSubstitution({ error })
    }
  }

  public async updateComment(data: IUpdateComment): Promise<UpdateCommentModel | BaseException> {
    try {
      const fields = CommentsEntity.getFieldsName()

      const result = await this._commentsRepository
        .createQueryBuilder(CommentsEntity.tableName)
        .andWhere(`${fields.id} = :commentId`, { commentId: data.commentId })
        .update({ text: data.text })
        .execute()

      return new UpdateCommentModel({ result: result.affected > 0 })
    } catch (error) {
      return new BaseException().errorSubstitution({ error })
    }
  }

  public async deleteComment(data: IDeleteComment): Promise<DeleteCommentModel | BaseException> {
    try {
      const fields = CommentsEntity.getFieldsName()

      const result = await this._commentsRepository
        .createQueryBuilder(CommentsEntity.tableName)
        .andWhere(`${fields.id} = :commentId`, { commentId: data.commentId })
        .softDelete()
        .execute()

      return new DeleteCommentModel({ result: result.affected > 0 })
    } catch (error) {
      return new BaseException().errorSubstitution({ error })
    }
  }

  public async getAllComments(data: IGetAllComments): Promise<GetAllCommentsModel | BaseException> {
    try {
      const fields = CommentsEntity.getFieldsName()

      const commentQueryBuilder = this._commentsRepository.createQueryBuilder(CommentsEntity.tableName)

      if (data.userId) {
        commentQueryBuilder.andWhere(`${fields.userId} = :userId`, { userId: data.userId })
      }

      const [items, totals] = await commentQueryBuilder
        .skip(data.skip)
        .limit(data.limit)
        .orderBy(fields.createdDate, data.sortOrder)
        .getManyAndCount()

      return new GetAllCommentsModel({ items, totals })
    } catch (error) {
      return new BaseException().errorSubstitution({ error })
    }
  }

  public async getComment(data: IGetComment): Promise<GetCommentModel | BaseException> {
    try {
      const fields = CommentsEntity.getFieldsName()

      const commentQueryBuilder = this._commentsRepository
        .createQueryBuilder(CommentsEntity.tableName)
        .andWhere(`${fields.id} = :commentId`, { commentId: data.commentId })

      if (data.userId) {
        commentQueryBuilder.andWhere(`${fields.userId} = :userId`, { userId: data.userId })
      }

      const result = await commentQueryBuilder.getOne()

      if (!result) {
        return new BaseException(BaseException.comments.EN.COMMENTS_IS_NOT_FOUND)
      }

      return new GetCommentModel(result)
    } catch (error) {
      return new BaseException().errorSubstitution({ error })
    }
  }

  public async getExpiredComments(): Promise<GetExpiredCommentsModel | BaseException> {
    try {
      const currentTime = new Date()
      const fields = CommentsEntity.getFieldsName()

      const comments = await this._commentsRepository
        .createQueryBuilder(CommentsEntity.tableName)
        .andWhere(`${fields.automaticDeletionDate} is not null`)
        .andWhere('UNIX_TIMESTAMP(:currentTime) - UNIX_TIMESTAMP(comment.createdDate) >= comment.autoDeleteAfter', {
          currentTime,
        })
        .select(fields.id)
        .getMany()

      return new GetExpiredCommentsModel(comments)
    } catch (error) {
      return new BaseException().errorSubstitution({ error })
    }
  }

  public async dropExpiredComments(data: IDropExpiredComments): Promise<void | BaseException> {
    try {
      const fields = CommentsEntity.getFieldsName()

      await this._commentsRepository
        .createQueryBuilder(CommentsEntity.tableName)
        .andWhere(`${fields.id} in (:...ids)`, { ids: data.ids })
        .softDelete()
        .execute()

      return
    } catch (error) {
      return new BaseException().errorSubstitution({ error })
    }
  }
}
