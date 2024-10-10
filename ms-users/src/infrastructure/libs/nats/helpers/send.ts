import { ClientNats } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

import { Topic } from '../custom-decorators/custom-message-pattern.decorator'
import { NatsInputType, NatsOutputType, PlainType, TopicsKeysType, TopicsType } from '../types'

export async function send<T extends TopicsKeysType, K extends keyof TopicsType[T]>(
  client: ClientNats,
  microservice: T,
  topic: K,
  data: NatsInputType<T, K>,
): Promise<PlainType<NatsOutputType<T, K>>> {
  const topicName = Topic(microservice, topic.toString())
  return await firstValueFrom(client.send(topicName, data))
}
