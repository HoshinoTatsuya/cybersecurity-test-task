import * as jwt from 'jsonwebtoken'

export interface JwtSignOptions extends jwt.SignOptions {
  secret?: string | Buffer
  privateKey?: jwt.Secret
}
