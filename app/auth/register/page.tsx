"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Input, Button, Card, Typography } from "antd";
import { AuthLayout } from "@/src/components/admin/layout/AuthLayout";
import { Register } from "@/src/services/auth/auth.services";
import { toast } from "react-toastify";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { AxiosError } from "axios";
import { RegisterType } from "@/src/types/auth";
const { Title } = Typography;
const RegisterPage: React.FC = () => {
  const router = useRouter();

  const {
    control: registerControl,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    watch,
  } = useForm<RegisterType>({
    defaultValues: {
      userName: "",
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const handleRegister = async (data: RegisterType) => {
    try {
      const userData = {
        userName: data.userName,
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        confirmPassword: data.confirmPassword ?? "",
      };

      const resLogin = await Register(userData);

      if (resLogin.status === 201) {
        router.push("/auth/login");
        toast.success("ثبت نام با موفقیت انجام شد.");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        "خطا در ثبت نام. لطفا دوباره تلاش کنید.";
      toast.error(errorMessage);
    }
  };

  return (
    <AuthLayout>
      <Card className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto p-6 rounded-2xl shadow-xl">
        <Title level={3} className="text-center mb-6 text-gray-800">
          ثبت نام حساب کاربری
        </Title>
        <Form
          name="registerForm"
          layout="vertical"
          autoComplete="on"
          className="space-y-4"
        >
          <Controller
            name="userName"
            control={registerControl}
            rules={{ required: "نام کاربری الزامی است." }}
            render={({ field }) => (
              <Form.Item
                label="نام کاربری"
                validateStatus={registerErrors.userName ? "error" : ""}
                help={registerErrors.userName?.message}
              >
                <Input
                  {...field}
                  placeholder="نام کاربری خود را وارد کنید"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="name"
            control={registerControl}
            rules={{ required: "نام و نام خانوادگی الزامی است." }}
            render={({ field }) => (
              <Form.Item
                label="نام و نام خانوادگی"
                validateStatus={registerErrors.name ? "error" : ""}
                help={registerErrors.name?.message}
              >
                <Input
                  {...field}
                  placeholder="نام و نام خانوادگی خود را وارد کنید"
                />
              </Form.Item>
            )}
          />

          <Controller
            name="email"
            control={registerControl}
            rules={{
              required: "ایمیل الزامی است.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "فرمت ایمیل نامعتبر است.",
              },
            }}
            render={({ field }) => (
              <Form.Item
                label="ایمیل"
                validateStatus={registerErrors.email ? "error" : ""}
                help={registerErrors.email?.message}
              >
                <Input {...field} placeholder="example@domain.com" />
              </Form.Item>
            )}
          />

          <Controller
            name="password"
            control={registerControl}
            rules={{
              required: "رمز عبور الزامی است.",
              minLength: {
                value: 8,
                message: "رمز عبور باید حداقل 8 کاراکتر باشد.",
              },
            }}
            render={({ field }) => (
              <Form.Item
                label="رمز عبور"
                validateStatus={registerErrors.password ? "error" : ""}
                help={registerErrors.password?.message}
              >
                <Input.Password
                  {...field}
                  placeholder="رمز عبور خود را وارد کنید"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="confirmPassword"
            control={registerControl}
            rules={{
              required: "تایید رمز عبور الزامی است.",
              validate: (value) =>
                value === password || "رمز عبور و تایید آن مطابقت ندارند.",
            }}
            render={({ field }) => (
              <Form.Item
                label="تایید رمز عبور"
                validateStatus={registerErrors.confirmPassword ? "error" : ""}
                help={registerErrors.confirmPassword?.message}
              >
                <Input.Password
                  {...field}
                  placeholder="رمز عبور خود را دوباره وارد کنید"
                />
              </Form.Item>
            )}
          />

          <Controller
            name="phone"
            control={registerControl}
            rules={{
              required: "شماره تلفن الزامی است.",
              pattern: {
                value: /^09\d{9}$/,
                message: "فرمت شماره تلفن نامعتبر است (مثال: 09123456789).",
              },
            }}
            render={({ field }) => (
              <Form.Item
                label="شماره تلفن"
                validateStatus={registerErrors.phone ? "error" : ""}
                help={registerErrors.phone?.message}
              >
                <Input {...field} placeholder="09123456789" />
              </Form.Item>
            )}
          />

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600"
              onClick={handleRegisterSubmit(handleRegister)}
            >
              ثبت نام
            </Button>
          </Form.Item>
          <div className="text-center text-sm text-gray-600 ">
            حساب کاربری دارید؟
            <Link
              href="/auth/login"
              className="text-blue-500 hover:text-blue-700 ml-1 px-2"
            >
              ورود
            </Link>
          </div>
        </Form>
      </Card>
    </AuthLayout>
  );
};

export default RegisterPage;
