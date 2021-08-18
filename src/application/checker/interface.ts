export interface IAdminChecker {
  isExistedByUsername(username: string): Promise<boolean>;
}
