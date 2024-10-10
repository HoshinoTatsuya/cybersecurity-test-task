import { outputType, OutputType } from './output.type'
import { TopicsKeysType } from './topic-keys.type'
import { TopicsType } from './topics.type'

export type NatsOutputType<T extends TopicsKeysType, K extends keyof TopicsType[T]> = OutputType<T, K, outputType<T, K>>
