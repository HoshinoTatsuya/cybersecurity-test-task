import { createHmac } from 'crypto'

import { ConfigService } from '@nestjs/config'

export class EncryptionService {
  public readonly _passwordSecret: string = new ConfigService().get<string>('PASSWORD_SECRET')

  public static async comparePasswords(plaintextPassword: string, hashedPassword: string): Promise<boolean> {
    const passwordSecret = new EncryptionService()._passwordSecret

    const result = createHmac('sha256', passwordSecret).update(plaintextPassword).digest('hex')

    return result === hashedPassword
  }

  public static async hashPassword(password: string): Promise<string> {
    const passwordSecret = new EncryptionService()._passwordSecret

    const result = createHmac('sha256', passwordSecret).update(password).digest('hex')

    return result
  }
}
