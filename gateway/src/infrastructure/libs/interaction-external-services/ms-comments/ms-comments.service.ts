import { Inject, Injectable } from '@nestjs/common'
import { ClientNats } from '@nestjs/microservices'

import { NATS } from '../../nats/constants'

import { IMsCommentsService } from './interfaces'
import { MS_COMMENTS_MODULE_OPTIONS } from './ms-comments.constants'
import { IMsCommentsModuleOptionsFactory } from './ms-comments.interface'
import { CommentsRequest } from './requests/comments.request'

@Injectable()
export class MsCommentsService implements IMsCommentsService {
  public constructor(
    @Inject(MS_COMMENTS_MODULE_OPTIONS) private readonly _optionsMsComments: IMsCommentsModuleOptionsFactory,
    @Inject(NATS) private readonly _client: ClientNats,
  ) {}

  public get comments(): CommentsRequest {
    return new CommentsRequest(this._optionsMsComments, this._client)
  }
}
