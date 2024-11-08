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

export type NetInfoState = {
  isConnected: boolean;
};

export interface DropDownType {
  label: string;
  value: string;
}

export type ToastState = {
  message?: string;
};

export type MapState = {
  city: string;
  area: string;
};

export type AuthState = {
  loading: boolean;
  signupLoading: boolean;
  currentUser?: any;
};
