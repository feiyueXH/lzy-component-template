import { getZoneData } from '@lzy-plugin/ddd-cqrs';
import { MongoContext, MongoManager } from '@lzy-plugin/mongo-context';
import { Init, Inject, Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { IAdminChecker } from '../interface';

@Provide()
@Scope(ScopeEnum.Singleton)
export class AdminChecker implements IAdminChecker {
  @Inject('mongo-context:mongoManager')
  mongoManager: MongoManager;

  mongoContext: MongoContext;

  @Init()
  async init(): Promise<void> {
    this.mongoContext = await this.mongoManager.getContext(
      getZoneData('dbKey')
    );
    this.mongoContext.switchModel('Admin');
  }

  async isExistedByUsername(username: string): Promise<boolean> {
    const result = await this.mongoContext.findOne({ username: username });
    return !!result;
  }
}
