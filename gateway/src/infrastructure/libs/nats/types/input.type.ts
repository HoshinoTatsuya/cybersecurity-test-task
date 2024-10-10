// eslint-disable-next-line @typescript-eslint/naming-convention
import { TopicsKeysType } from './topic-keys.type'
import { TopicsType } from './topics.type'

export type inputType<T extends TopicsKeysType, K extends keyof TopicsType[T]> = 'input' extends keyof TopicsType[T][K]
  ? 'input'
  : never
