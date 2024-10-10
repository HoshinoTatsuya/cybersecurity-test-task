import { INestApplication, INestMicroservice } from '@nestjs/common'

import { LocalizedValidationPipe } from '../pipes'

export class CustomGlobalSettings {
  public static createGlobalSettings<T extends INestApplication | INestMicroservice>(app: T): T {
    app.useGlobalPipes(new LocalizedValidationPipe())

    return app
  }
}
