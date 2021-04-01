import { RequestBase } from './base';
import { DtoLogin, DtoLoginSuccess, DtoVerifyCode } from './dto/user.dto';

const PREFIX = '/user';

class UserServiceClass extends RequestBase {
  constructor() {
    super({ prefix: PREFIX });
  }

  authImage(data: DtoVerifyCode) {
    return this.request<any, ArrayBuffer>({
      url: `/authImage`,
      method: 'GET',
      params: data,
      responseType: 'arraybuffer',
    });
  }

  login(data: DtoLogin) {
    return this.request<DtoLoginSuccess>({
      url: '/login',
      method: 'POST',
      params: { ...data },
    });
  }
}

const UserService = UserServiceClass.getSingletonInstance<UserServiceClass>();

export { UserService };
