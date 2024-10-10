import { Provider } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'

import { CommentsScheduler } from '../../domain/schedulers/comments.scheduler'
import { CommentsRepository } from '../repositories/comments/comments.repository'

export const SCHEDULER_WORKER = Symbol('SCHEDULER_WORKER')

export const SchedulersProvider: Provider = {
  provide: SCHEDULER_WORKER,
  inject: [CommentsRepository],
  useFactory: (commentsRepository: CommentsRepository, schedulerRegistry: SchedulerRegistry) =>
    new CommentsScheduler(commentsRepository, schedulerRegistry),
}
