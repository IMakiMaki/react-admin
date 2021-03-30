import { DtoLogin, DtoLoginSuccess, DtoVerifyCode } from './dto/user.dto';
import { RequestBase } from './base';
import { DtoSuccessResponse } from './dto/common.dto';

const PREFIX = '/user';

class UserServiceClass extends RequestBase {
  constructor() {
    super({ prefix: PREFIX });
  }

  authImage(data: DtoVerifyCode) {
    return this.reqBase.request<ArrayBuffer>({
      url: `/authImage`,
      method: 'GET',
      params: data,
      responseType: 'arraybuffer',
    });
  }

  login(data: DtoLogin) {
    return this.reqBase.request<DtoSuccessResponse<DtoLoginSuccess>>({
      url: '/login',
      method: 'POST',
      params: { ...data },
    });
  }
}

const UserService = UserServiceClass.getSingletonInstance<UserServiceClass>();

export { UserService };
