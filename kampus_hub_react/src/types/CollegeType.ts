type CollegeType = {
  username: string;
  password: string;
  gender: string;
  address: string;
  faculty: string;
  isActive?: boolean;
  nim: string;
};

type ApiResponse<T> = {
  data: T;
  msg: string;
  log: string;
  status: number;
};

export type { CollegeType, ApiResponse };
