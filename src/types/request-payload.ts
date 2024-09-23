export type AuthenticateUserPayload = {
  email: string;
  password: string;
  fullName?: string;
  createdAt?: Date;
};
