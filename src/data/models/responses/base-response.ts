import {RequestStatus} from '@app-types';

export type TBaseResponse<T> = {
  status: RequestStatus;
  msg: string;
  data: T;
  message?: string;
};

export class BaseResponse<T> {
  public status: RequestStatus;
  public msg: string;
  public data: T;
  public message?: string;

  constructor(status: RequestStatus, msg: string, data: T, message?: string) {
    this.status = status;
    this.msg = msg;
    this.data = data;
    this.message = message;
  }

  public toJson = (): TBaseResponse<T> => ({
    status: this.status,
    data: this.data,
    msg: this.msg,
    message: this.message,
  });
}
