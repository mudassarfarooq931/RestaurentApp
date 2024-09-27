export type BaseState<T> = {
  message: string;
  error: boolean;
  loading: boolean;
  data?: T;
};

export type RejectState = {
  rejectValue: {
    status: number;
    message: string;
    networkError: boolean;
    msg?: string;
  };
};
export type ToastState = {
  message?: string;
};

export type AuthState = {
  currentUser?: string;
};
