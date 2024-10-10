import { BaseException } from '../../exceptions'
import { ICreateUser, IGetOneUser } from './interfaces'
import { CreateUserModel, GetOneUserModel } from './models'

export abstract class IUsersRepository {
  public abstract createUser(data: ICreateUser): Promise<CreateUserModel | BaseException>

  public abstract getOneUser(data: IGetOneUser): Promise<GetOneUserModel | BaseException>
}
