import { DomainEvent } from '@lzy-plugin/ddd-cqrs';
import { Admin } from '../aggregate/admin';

export class AdminRegisteredEvent extends DomainEvent {
  constructor(source: Admin) {
    super(source);
    this.setCreateTime(new Date());
  }

  toString(): string {
    throw new Error('Method not implemented.');
  }
}
