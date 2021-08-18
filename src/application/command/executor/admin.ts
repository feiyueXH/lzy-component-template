import {
  CommonException,
  CommonRepository,
  ExceptionCodeEnum,
  RepositoryManager,
  SubscribeCommand,
  SuperCommand,
  SuperCommandExecutor
} from '@lzy-plugin/ddd-cqrs';
import { Inject, Provide } from '@midwayjs/decorator';
import { Admin } from '../../../domain/aggregate/admin';
import { IAdminChecker } from '../../checker/interface';
import { RegisterAdminCommand } from '../register-admin.command';

@SubscribeCommand([RegisterAdminCommand])
@Provide()
export class AdminCommandExecutor extends SuperCommandExecutor {
  adminRepository: CommonRepository<Admin>;

  @Inject()
  adminChecker: IAdminChecker;

  public async init(repositoryManager: RepositoryManager): Promise<void> {
    this.adminRepository = await repositoryManager.get(Admin);
  }
  async executeCommand<C extends SuperCommand>(command: C): Promise<void> {
    if (command instanceof RegisterAdminCommand) {
      await this.register(command);
    } else {
      throw new Error('未定义执行逻辑的命令!');
    }
  }

  private async register(command: RegisterAdminCommand): Promise<void> {
    //判断操作者是否为超级管理员
    const superAdmin: Admin = await this.adminRepository.get(
      command.operatorId
    );

    if (!superAdmin || superAdmin.superAdmin !== true) {
      throw new CommonException(ExceptionCodeEnum.UNKNOWN_ERR, '无权限');
    }
    const admin: Admin = await Admin.create(Admin, command, this.adminChecker);
    await this.adminRepository.add(admin);
  }
}
