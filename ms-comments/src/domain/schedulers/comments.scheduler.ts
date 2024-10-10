import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule'

import { BaseException } from '../exceptions'
import { ICommentsRepository } from '../repositories/comments/comments.repository'

import { StagesOfWorkScheduler } from './stages-of-work.scheduler'

@Injectable()
export class CommentsScheduler {
  public constructor(
    private readonly _commentsRepository: ICommentsRepository,
    private _schedulerRegistry: SchedulerRegistry,
  ) {}

  @Cron(CronExpression.EVERY_HOUR, { name: StagesOfWorkScheduler.dropComments.name }) // Запуск каждый час
  private async _dropComments(): Promise<void> {
    Logger.debug(StagesOfWorkScheduler.dropComments.start)
    const job = this._schedulerRegistry.getCronJob(StagesOfWorkScheduler.dropComments.name)
    job.stop()
    try {
      const comments = await this._commentsRepository.getExpiredComments()

      if (comments instanceof BaseException) {
        Logger.error(BaseException.comments.EN.SCHEDULER_DROP_COMMENT_ERROR)
        return
      }

      if (comments.ids?.length > 0) {
        await this._commentsRepository.dropExpiredComments(comments)
      }

      Logger.debug(StagesOfWorkScheduler.dropComments.end)
      return
    } catch (e) {
      Logger.error('cronSyncBasicValues')
      Logger.error(e?.message, e?.stack, 'ms-users')
    } finally {
      job.start()
    }
  }
}
