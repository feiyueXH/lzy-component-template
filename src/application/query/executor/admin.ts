import {
  AdminExceptionCodeEnum,
  CommonException,
  ExceptionCodeEnum,
  getZoneData,
  SubscribeQuery,
  SuperQuery,
  SuperQueryExecutor
} from '@lzy-plugin/ddd-cqrs';
import { IMongoManager, MongoContext } from '@lzy-plugin/mongo-context';
import { Provide } from '@midwayjs/decorator';
import { AdminModel } from '../../../infrastructure/db/mongo/models/admin';
import { AdminLoginQuery } from '../admin-login.query';

@SubscribeQuery([AdminLoginQuery])
@Provide()
export class AdminQueryExecutor extends SuperQueryExecutor {
  mongoContext: MongoContext;

  async init(mongoManager: IMongoManager): Promise<any> {
    this.mongoContext = await mongoManager.getContext(getZoneData('dbKey'));
  }

  async executeQuery<C extends SuperQuery>(query: C): Promise<void> {
    if (query instanceof AdminLoginQuery) {
      await this.login(query);
    } else {
      throw new Error('未定义执行逻辑的命令!');
    }
  }

  private async login(query: AdminLoginQuery): Promise<void> {
    if (!query.username) {
      throw new CommonException(
        ExceptionCodeEnum.VALIDATE_FAIL,
        '账号不能为空'
      );
    }

    if (!query.password) {
      throw new CommonException(
        ExceptionCodeEnum.VALIDATE_FAIL,
        '密码不能为空'
      );
    }

    const admin: AdminModel = await this.mongoContext
      .switchModel('Admin')
      .findOne({
        username: query.username
      });

    if (!admin) {
      throw new CommonException(
        AdminExceptionCodeEnum.ADMIN_USERNAME_NOT_EXIST,
        '该账号不存在'
      );
    }

    if (admin.password !== query.password) {
      throw new CommonException(
        AdminExceptionCodeEnum.ADMIN_PASSWORD_ERROR,
        '密码错误'
      );
    }

    if (admin.status !== true) {
      throw new CommonException(
        AdminExceptionCodeEnum.ADMIN_DISENABLE,
        '该账号被禁用'
      );
    }
  }
}
