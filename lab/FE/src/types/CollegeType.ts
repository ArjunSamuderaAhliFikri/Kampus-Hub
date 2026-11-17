type CollegeType = {
  username: string;
  password: string;
  gender: string;
  address: string;
  faculty: string;
};

type ApiResponse<T> = {
  data: T;
  msg: string;
  log: string;
  status: number;
};

export type { CollegeType, ApiResponse };
