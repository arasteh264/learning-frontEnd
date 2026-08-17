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
  status:number;
};
export type OtpChannel = "sms" | "email";
export type OtpPurpose = "login" | "reset_password";

export type SendOtpType = {
  identifier: string;
  channel: OtpChannel;
  purpose: OtpPurpose;
};

export type VerifyOtpType = {
  identifier: string;
  code: string;
  purpose: OtpPurpose;
};

export type ResetPasswordType = {
  identifier: string;
  code: string;
  newPassword: string;
};

export type OtpApiResponse = { success: boolean };
export type VerifyOtpApiResponse = {
  data: {
    verified: boolean;
    identifier: string;
    accessToken?: string;
    id?: string;
    name?: string;
    user?: { role: string };
  };
};