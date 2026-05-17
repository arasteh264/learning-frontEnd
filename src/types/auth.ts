export interface LoginType{
    password:string;
    identifier:string;
}

export interface RegisterType{
  userName: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword?: string;
};