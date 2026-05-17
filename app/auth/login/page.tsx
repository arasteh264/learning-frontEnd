"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { Input, Button, Checkbox, Form, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AuthLayout } from "@/components/admin/layout/AuthLayout";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSession, signIn } from "next-auth/react";
import { de } from "zod/v4/locales";
type Inputs = {
  username: string;
  password: string;
  remember: boolean;
};

const LoginPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      remember: false,
    },
  });
  const router = useRouter();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (res?.ok) {
      const session = await getSession();

      toast.success("ورود موفقیت‌آمیز بود.");

      if (session?.user?.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } else {
      toast.error("نام کاربری یا رمز عبور اشتباه است.");
    }
  };

  return (
    <AuthLayout>
      <Card className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          ورود به حساب کاربری
        </h2>
        <Form
          name="loginForm"
          onFinish={handleSubmit(onSubmit)}
          layout="vertical"
          className="space-y-4"
        >
          <Controller
            name="username"
            control={control}
            rules={{
              required: "نام کاربری الزامی است.",
              minLength: {
                value: 3,
                message: "نام کاربری باید حداقل ۳ کاراکتر باشد.",
              },
            }}
            render={({ field }) => (
              <Form.Item
                label="نام کاربری"
                validateStatus={errors.username ? "error" : ""}
                help={errors.username?.message}
              >
                <Input
                  {...field}
                  prefix={
                    <UserOutlined className="site-form-item-icon text-gray-400" />
                  }
                  placeholder="نام کاربری"
                  className="rounded-lg p-3"
                />
              </Form.Item>
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: "رمز عبور الزامی است.",
              minLength: {
                value: 6,
                message: "رمز عبور باید حداقل ۶ کاراکتر باشد.",
              },
            }}
            render={({ field }) => (
              <Form.Item
                label="رمز عبور"
                validateStatus={errors.password ? "error" : ""}
                help={errors.password?.message}
              >
                <Input.Password
                  {...field}
                  prefix={
                    <LockOutlined className="site-form-item-icon text-gray-400" />
                  }
                  placeholder="رمز عبور"
                  className="rounded-lg p-3"
                />
              </Form.Item>
            )}
          />

          <Controller
            name="remember"
            control={control}
            render={({ field }) => (
              <Form.Item valuePropName="checked">
                <div className="flex justify-between items-center">
                  <Checkbox {...field} checked={field.value}>
                    مرا به خاطر بسپار
                  </Checkbox>
                  <a
                    href="/forgot-password"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    فراموشی رمز عبور؟
                  </a>
                </div>
              </Form.Item>
            )}
          />

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 rounded-lg bg-blue-600 hover:bg-blue-700 text-lg font-semibold"
              onClick={handleSubmit(onSubmit)}
            >
              ورود
            </Button>
          </Form.Item>

          <div className="text-center text-sm text-gray-600">
            حساب کاربری ندارید؟
            <Link
              href="/auth/register"
              className="text-blue-500 hover:text-blue-700 ml-1"
            >
              ثبت نام کنید
            </Link>
          </div>
        </Form>
      </Card>
    </AuthLayout>
  );
};

export default LoginPage;
