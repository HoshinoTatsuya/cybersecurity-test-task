import { Injectable } from '@nestjs/common'
import { ClientNats } from '@nestjs/microservices'

import { BaseException } from '../../../../../domain/exceptions'
import { BaseRequestsService } from '../base-request.service'
import { IMsCommentsModuleOptionsFactory } from '../ms-comments.interface'

import { route } from './constants'
import {
  ICreateComment,
  IDeleteComment,
  IGetAllCommentsByUser,
  IGetAllMyComments,
  IUpdateComment,
} from './interfaces/comments'
import {
  CreateCommentModel,
  DeleteCommentModel,
  GetAllCommentsByUserModel,
  GetAllMyCommentsModel,
  UpdateCommentModel,
} from './models/comments'

@Injectable()
export class CommentsRequest extends BaseRequestsService {
  private _msCommentsConfig: IMsCommentsModuleOptionsFactory

  public constructor(
    public msCommentsConfigService: IMsCommentsModuleOptionsFactory,
    public _client: ClientNats,
  ) {
    super(msCommentsConfigService.logger.nats, msCommentsConfigService.logger.axios, _client)
    this._msCommentsConfig = msCommentsConfigService
  }

  public async createComment(payload: ICreateComment): Promise<CreateCommentModel | BaseException> {
    try {
      const result = await this.natsRequestWithResponse<CreateCommentModel, ICreateComment>({
        serviceName: route.comments.nameService,
        method: route.comments.methods.createComment,
        payload,
      })

      if (result instanceof BaseException) {
        return result
      }

      return new CreateCommentModel(result)
    } catch (error) {
      return new BaseException().errorSubstitution({ error })
    }
  }

  public async updateComment(payload: IUpdateComment): Promise<UpdateCommentModel | BaseException> {
    try {
      const result = await this.natsRequestWithResponse<UpdateCommentModel, IUpdateComment>({
        serviceName: route.comments.nameService,
        method: route.comments.methods.updateComment,
        payload,
      })

      if (result instanceof BaseException) {
        return result
      }

      return new UpdateCommentModel(result)
    } catch (error) {
      return new BaseException().errorSubstitution({ error })
    }
  }

  public async deleteComment(payload: IDeleteComment): Promise<DeleteCommentModel | BaseException> {
    try {
      const result = await this.natsRequestWithResponse<DeleteCommentModel, IDeleteComment>({
        serviceName: route.comments.nameService,
        method: route.comments.methods.deleteComment,
        payload,
      })

      if (result instanceof BaseException) {
        return result
      }

      return new DeleteCommentModel(result)
    } catch (error) {
      return new BaseException().errorSubstitution({ error })
    }
  }

  public async getAllMyComments(payload: IGetAllMyComments): Promise<GetAllMyCommentsModel | BaseException> {
    try {
      const result = await this.natsRequestWithResponse<GetAllMyCommentsModel, IGetAllMyComments>({
        serviceName: route.comments.nameService,
        method: route.comments.methods.getAllMyComments,
        payload,
      })

      if (result instanceof BaseException) {
        return result
      }

      return new GetAllMyCommentsModel(result)
    } catch (error) {
      return new BaseException().errorSubstitution({ error })
    }
  }

  public async getAllCommentsByUser(
    payload: IGetAllCommentsByUser,
  ): Promise<GetAllCommentsByUserModel | BaseException> {
    try {
      const result = await this.natsRequestWithResponse<GetAllCommentsByUserModel, IGetAllCommentsByUser>({
        serviceName: route.comments.nameService,
        method: route.comments.methods.getAllCommentsByUser,
        payload,
      })

      if (result instanceof BaseException) {
        return result
      }

      return new GetAllCommentsByUserModel(result)
    } catch (error) {
      return new BaseException().errorSubstitution({ error })
    }
  }
}
