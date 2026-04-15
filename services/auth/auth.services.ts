import { LoginType, RegisterType } from '@/types/auth';
import http from '../interseptor/http';

export const Login = async ({ identifier, password }:LoginType) => {
  const response = await http.post('/auth/login', {
    identifier,
    password
  });

  return response;
};

export const Register = async ({ userName, password, name, phone,email,confirmPassword }: RegisterType) => {
  const response = await http.post('/auth/register', {
    userName,
    password,
    name,
    phone,
    email,
    confirmPassword
  });
  return response;
};