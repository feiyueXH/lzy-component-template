import { SuperQuery, ValidateMessages } from '@lzy-plugin/ddd-cqrs';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class AdminLoginQuery extends SuperQuery {
  @Expose()
  @IsNotEmpty({
    message: ValidateMessages.base_isNotEmpty
  })
  public username: string;

  @Expose()
  @IsNotEmpty({
    message: ValidateMessages.base_isNotEmpty
  })
  password: string;
}
