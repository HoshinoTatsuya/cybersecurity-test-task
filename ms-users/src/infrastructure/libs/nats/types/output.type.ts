// eslint-disable-next-line @typescript-eslint/naming-convention
import { TopicsKeysType } from './topic-keys.type'
import { TopicsType } from './topics.type'

export type outputType<
  T extends TopicsKeysType,
  K extends keyof TopicsType[T],
> = 'output' extends keyof TopicsType[T][K] ? 'output' : never

export type OutputType<
  T extends TopicsKeysType,
  K extends keyof TopicsType[T],
  L extends keyof TopicsType[T][K],
> = TopicsType[T][K][L]
