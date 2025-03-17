import {UserDto} from '@dto-models';
import {BaseResponse} from './base-response';

export class UserLoginResponse extends BaseResponse<UserDto> {
  constructor(response: UserLoginResponse) {
    super(response.status, response.msg, response.data);
  }
}
