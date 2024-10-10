import { BaseException } from '../../exceptions'
import { ICreateUser, IGetOneUser, IGetRefreshToken, IGetUserForLogin, ISetRefreshToken } from './interfaces'
import {
  CreateUserModel,
  GetOneUserModel,
  GetRefreshTokenModel,
  GetUserForLoginModel,
  SetRefreshTokenModel,
} from './models'

export abstract class IUsersRepository {
  public abstract createUser(data: ICreateUser): Promise<CreateUserModel | BaseException>

  public abstract getUserForLogin(data: IGetUserForLogin): Promise<GetUserForLoginModel | BaseException>

  public abstract setRefreshToken(data: ISetRefreshToken): Promise<SetRefreshTokenModel | BaseException>

  public abstract getRefreshToken(data: IGetRefreshToken): Promise<GetRefreshTokenModel | BaseException>

  public abstract getOneUser(data: IGetOneUser): Promise<GetOneUserModel | BaseException>
}
