import { DtoVerifyCode } from './dto/user.dto';
import { RequestBase } from './base';

const PREFIX = '/user';

class UserService extends RequestBase {
  constructor() {
    super({ prefix: PREFIX });
  }

  getVerifyCodeImg(data: DtoVerifyCode) {
    return this.reqBase.request({
      url: `/authImage`,
      method: 'GET',
      params: data,
      responseType: 'arraybuffer',
    });
  }
}

export default UserService.getSingletonInstance<UserService>();
