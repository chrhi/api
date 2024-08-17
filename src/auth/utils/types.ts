export type AuthInput = { email: string; password: string };

export type SignInData = { userId: string; email: string };

export type AuthResult = {
  accessToken: string;
  userId: string;

  email: string;
};
