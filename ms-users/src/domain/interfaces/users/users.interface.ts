import { BaseException } from '../../exceptions'
import { CreateUserModel, GetInfoAboutMeModel, LoginModel, VerifyTokenModel } from '../../models/users'

import { ICreateUser, IGetInfoAboutMe, ILogin, IVerifyToken } from './methods'

export abstract class IUsers {
  public abstract createUser(data: ICreateUser): Promise<CreateUserModel | BaseException>

  public abstract login(data: ILogin): Promise<LoginModel | BaseException>

  public abstract uploadAvatar(): Promise<void>

  public abstract confirmAvatar(): Promise<void>

  public abstract getInfoAboutMe(data: IGetInfoAboutMe): Promise<GetInfoAboutMeModel | BaseException>

  public abstract verifyToken(data: IVerifyToken): Promise<VerifyTokenModel | BaseException>
}
