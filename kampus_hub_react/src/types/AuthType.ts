type AuthResponse<T> = {
  message: string;
  error: string;
  user: T;
  accessToken: string;
  refreshToken: string;
};

type UserResponse = {
  userId?: string;
  username: string;
  role: "admin" | "mahasiswa";
};

type BodyRequest = {
  username: string;
  password: string;
};

type RegisterRequest = {
  username: string;
  password: string;
  nim: string;
};

export type { AuthResponse, BodyRequest, UserResponse, RegisterRequest };
