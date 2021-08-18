import {
  AggregateRoot,
  CommonException,
  Entity,
  EntityFactory,
  ExceptionCodeEnum,
  IsPasswordFormat,
  IsUsernameFormat,
  ValidateMessages
} from '@lzy-plugin/ddd-cqrs';
import { Expose } from 'class-transformer';
import { IsByteLength, IsNotEmpty, IsString } from 'class-validator';
import { IAdminChecker } from '../../application/checker/interface';

export class Admin extends AggregateRoot {
  @Expose()
  @IsNotEmpty({ message: ValidateMessages.base_isNotEmpty })
  @IsString({ message: ValidateMessages.base_isString })
  @IsByteLength(6, 20, { message: ValidateMessages.base_byteLengthLimit })
  @IsUsernameFormat({ message: ValidateMessages.common_usernameFormat })
  username: string;

  @Expose()
  @IsNotEmpty({ message: ValidateMessages.base_isNotEmpty })
  @IsString({ message: ValidateMessages.base_isString })
  @IsByteLength(6, 20, { message: ValidateMessages.base_byteLengthLimit })
  @IsPasswordFormat({ message: ValidateMessages.common_passwordFormat })
  password: string;

  @Expose()
  status = false;

  @Expose()
  superAdmin = false;

  public equalPassword(password: string): boolean {
    return this.password === password;
  }

  static async create<T extends Entity>(
    clazz: new () => T,
    object: Record<string, any>,
    adminChecker: IAdminChecker
  ): Promise<T> {
    if (await adminChecker.isExistedByUsername(object.username)) {
      throw new CommonException(
        ExceptionCodeEnum.DB_FAIL_CREATE_UNIQUE,
        '账号已经注册'
      );
    } else {
      return await EntityFactory.create(clazz, object);
    }
  }
}
