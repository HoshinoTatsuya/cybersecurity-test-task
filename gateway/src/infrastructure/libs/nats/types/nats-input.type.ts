import { inputType } from './input.type'
import { OutputType } from './output.type'
import { TopicsKeysType } from './topic-keys.type'
import { TopicsType } from './topics.type'

export type NatsInputType<T extends TopicsKeysType, K extends keyof TopicsType[T]> = OutputType<T, K, inputType<T, K>>
