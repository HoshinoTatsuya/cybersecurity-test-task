import { MessagePattern } from '@nestjs/microservices'

export const Topic = (microservice: string | symbol, topic: string): string => `${microservice.toString()}.${topic}`

export const CustomMessagePattern = (prefix: string | symbol, topic: string): MethodDecorator => {
  return MessagePattern(Topic(prefix, topic))
}
