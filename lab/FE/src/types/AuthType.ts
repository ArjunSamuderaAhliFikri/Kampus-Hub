type AuthResponse<T> = {
  message: string;
  error: string;
  user: T;
};

type BodyRequest = {
  username: string;
  password: string;
};

export type { AuthResponse, BodyRequest };
