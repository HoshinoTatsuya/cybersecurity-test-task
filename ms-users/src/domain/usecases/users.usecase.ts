import { Injectable } from '@nestjs/common'
import * as fs from 'node:fs'
import * as path from 'path'
import { EncryptionService } from '../../infrastructure/libs/helper-services/encription/encryption.service'
import { Role } from '../enums'
import { BaseException } from '../exceptions'
import { JwtServiceIntegration } from '../integrations/jwt/services/jwt.service.integration'
import { IUsers } from '../interfaces/users'
import { ICreateUser, IGetInfoAboutMe, ILogin, IUploadAvatar, IVerifyToken } from '../interfaces/users/methods'
import { CreateUserModel, GetInfoAboutMeModel, LoginModel, UploadAvatarModel, VerifyTokenModel } from '../models/users'
import { IUsersRepository } from '../repositories/users/users.repository'

@Injectable()
export class UsersUsecase implements IUsers {
  public constructor(
    private readonly _usersRepository: IUsersRepository,
    private readonly _jwtServiceIntegration: JwtServiceIntegration,
  ) {}

  public async createUser(data: ICreateUser): Promise<CreateUserModel | BaseException> {
    const hashPassword = await EncryptionService.hashPassword(data.password)

    const result = await this._usersRepository.createUser({ ...data, password: hashPassword })

    if (result instanceof BaseException) {
      return result
    }

    return new CreateUserModel(result)
  }

  public async login(data: ILogin): Promise<LoginModel | BaseException> {
    const hashPassword = await EncryptionService.hashPassword(data.password)

    const userIsExist = await this._usersRepository.getUserForLogin({ email: data.email, password: hashPassword })

    if (userIsExist instanceof BaseException) {
      return userIsExist
    }

    const dataRefreshToken = await this._jwtServiceIntegration.createRefreshToken()

    if (dataRefreshToken instanceof BaseException) {
      return dataRefreshToken
    }

    const dataAccessToken = await this._jwtServiceIntegration.createAccessTokenNewVersion({
      userId: userIsExist.id,
      role: userIsExist.role,
      refreshToken: dataRefreshToken.refreshToken,
    })

    if (dataAccessToken instanceof BaseException) {
      return dataAccessToken
    }

    const result = await this._usersRepository.setRefreshToken({
      userId: userIsExist.id,
      refreshToken: dataRefreshToken.refreshToken,
    })

    if (result instanceof BaseException) {
      return result
    }

    return new LoginModel({ token: dataAccessToken.accessToken })
  }

  public async uploadAvatar(data: IUploadAvatar): Promise<UploadAvatarModel | BaseException> {
    const { userId, fileName, fileData } = data

    const directoryPath = path.join(__dirname, '../uploads/avatars', userId)
    const filePath = path.join(directoryPath, fileName)

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true })
    }

    fs.writeFileSync(filePath, Buffer.from(fileData, 'base64'))

    const result = await this._usersRepository.setAvatar({ userId, pathAvatar: filePath })

    if (result instanceof BaseException) {
      return result
    }

    return new UploadAvatarModel({ result: true })
  }

  public async confirmAvatar(): Promise<void> {}

  public async getInfoAboutMe(data: IGetInfoAboutMe): Promise<GetInfoAboutMeModel | BaseException> {
    const result = await this._usersRepository.getOneUser({ userId: data.userId })

    if (result instanceof BaseException) {
      return result
    }

    return new GetInfoAboutMeModel(result)
  }

  public async verifyToken(data: IVerifyToken): Promise<VerifyTokenModel | BaseException> {
    const dataAccessToken = await this._jwtServiceIntegration.decodeAccessToken({ accessToken: data.token })

    if (dataAccessToken instanceof BaseException) {
      return dataAccessToken
    }

    const dataOfRefreshToken = await this._usersRepository.getRefreshToken({ userId: dataAccessToken.userId })

    if (dataOfRefreshToken instanceof BaseException) {
      return dataOfRefreshToken
    }

    const result = await this._jwtServiceIntegration.verifyAccessTokenNewVersion({
      accessToken: data.token,
      refreshToken: dataOfRefreshToken.token,
    })

    if (result instanceof BaseException) {
      return result
    }

    return new VerifyTokenModel({ userId: dataAccessToken.userId, role: dataAccessToken.role as Role })
  }
}
