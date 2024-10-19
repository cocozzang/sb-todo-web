enum RoleEnum {
  ADMIN = 1,
  SUB_ADMIN,
  USER,
}

enum ProviderEnum {
  CREDENTIAL = "CREDENTIAL",
  GOOGLE = "GOOGLE",
}

type User = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  account: string | null;
  email: string | null;
  name: string;
  profileImage: string | null;
  provider: ProviderEnum;
  role: RoleEnum;
};

type ActionResponse<T> = {
  status: number;
  success: boolean;
  error?: any;
  message?: string;
  data?: T | null;
};
