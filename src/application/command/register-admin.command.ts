import {
  IsPasswordFormat,
  IsUsernameFormat,
  SuperCommand,
  ValidateMessages
} from '@lzy-plugin/ddd-cqrs';
import { Expose } from 'class-transformer';
import { IsByteLength, IsNotEmpty, IsString } from 'class-validator';

//管理员注册命令
export class RegisterAdminCommand extends SuperCommand {
  @Expose()
  @IsNotEmpty({
    message: ValidateMessages.base_isNotEmpty
  })
  @IsString({
    message: ValidateMessages.base_isString
  })
  @IsByteLength(6, 20, {
    message: ValidateMessages.base_byteLengthLimit
  })
  @IsUsernameFormat({
    message: ValidateMessages.common_usernameFormat
  })
  public username: string;

  @Expose()
  @IsNotEmpty({
    message: ValidateMessages.base_isNotEmpty
  })
  @IsString({
    message: ValidateMessages.base_isString
  })
  @IsByteLength(6, 20, {
    message: ValidateMessages.base_byteLengthLimit
  })
  @IsPasswordFormat({
    message: ValidateMessages.common_passwordFormat
  })
  password: string;

  constructor() {
    super();
  }
}
