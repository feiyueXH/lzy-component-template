import { prop } from '@typegoose/typegoose';
import { SuperModel, TypegooseModel } from '@lzy-plugin/mongo-context';
import { Expose } from 'class-transformer';
@TypegooseModel({ modelName: 'Admin', collectionName: 'admin' })
export class AdminModel extends SuperModel {
  @prop()
  @Expose()
  public username: string;

  @prop()
  @Expose()
  public password: string;

  @prop()
  @Expose()
  public status: boolean;

  @prop()
  @Expose()
  public superAdmin: boolean;
}
