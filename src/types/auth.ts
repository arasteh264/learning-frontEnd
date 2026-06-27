export interface LoginType {
  password: string;
  identifier: string;
}

export interface RegisterType {
  userName: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword?: string;
}
export type AuthResponse = {
  ok: boolean;
  error?: string;
};

export type LoginApiResponse = {
  data: {
    id: string;
    name: string;
    accessToken: string;
    user: {
      role: string;
    };
  };
};

export type RegisterResponse = {
  message: string;
};
