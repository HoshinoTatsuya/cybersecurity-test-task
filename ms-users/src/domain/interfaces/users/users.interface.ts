import { BaseException } from '../../exceptions'
import {
  CreateUserModel,
  GetInfoAboutMeModel,
  LoginModel,
  UploadAvatarModel,
  VerifyTokenModel,
} from '../../models/users'

import { ICreateUser, IGetInfoAboutMe, ILogin, IUploadAvatar, IVerifyToken } from './methods'

export abstract class IUsers {
  public abstract createUser(data: ICreateUser): Promise<CreateUserModel | BaseException>

  public abstract login(data: ILogin): Promise<LoginModel | BaseException>

  public abstract uploadAvatar(data: IUploadAvatar): Promise<UploadAvatarModel | BaseException>

  public abstract confirmAvatar(): Promise<void>

  public abstract getInfoAboutMe(data: IGetInfoAboutMe): Promise<GetInfoAboutMeModel | BaseException>

  public abstract verifyToken(data: IVerifyToken): Promise<VerifyTokenModel | BaseException>
}
