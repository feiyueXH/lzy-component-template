// eslint-disable-next-line node/no-extraneous-import
import { ALL, Body, Controller, Get, Post, Provide } from '@midwayjs/decorator';
import { SuperController } from '@lzy-plugin/ddd-cqrs';
import { plainToClass } from 'class-transformer';
import { RegisterAdminCommand } from '../../application/command/register-admin.command';
import { AdminLoginQuery } from '../../application/query/admin-login.query';

@Controller('/admins')
@Provide()
export class AdminController extends SuperController {
  @Post('/')
  async registerAdmin(@Body(ALL) body: any): Promise<void> {
    //接收所有参数
    this.logger.info(body);
    const command: RegisterAdminCommand = plainToClass(
      RegisterAdminCommand,
      body,
      { excludeExtraneousValues: true }
    );
    await this.commandBus.send(command, { dbKey: 'admin' });
    //处理成功,响应请求
    this.httpHelper.success(null, 'OK');
  }

  @Post('/actions/login')
  async login(@Body(ALL) body): Promise<void> {
    //发起注册账号命令
    const query = plainToClass(AdminLoginQuery, body, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true
    });
    await this.queryBus.send(query, { dbKey: 'admin' });

    //处理成功,响应请求
    this.httpHelper.success(null, 'OK');
  }

  @Get('/')
  async listAdmin(): Promise<void> {
    this.httpHelper.success(null, 'OK');
  }
}
