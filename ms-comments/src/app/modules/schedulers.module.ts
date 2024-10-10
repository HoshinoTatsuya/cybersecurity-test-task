import { Module } from '@nestjs/common'

import { SCHEDULER_WORKER, SchedulersProvider } from '../providers/schedulers.provider'

@Module({
  imports: [],
  controllers: [],
  providers: [SchedulersProvider],
  exports: [SCHEDULER_WORKER],
})
export class SchedulersModule {}
