import { z } from "zod";

function isValidNationalId(code: string) {
  if (!/^\d{10}$/.test(code)) return false;

  const check = +code[9];
  const sum =
    code
      .split("")
      .slice(0, 9)
      .reduce((acc, num, i) => acc + +num * (10 - i), 0) % 11;

  return (
    (sum < 2 && check === sum) ||
    (sum >= 2 && check === 11 - sum)
  );
}

export const profileSchema = z.object({
  name: z
    .string()
    .min(2, "نام خیلی کوتاه است")
    .regex(
      /^[\u0600-\u06FF\s]+$/,
      "نام فقط باید فارسی باشد"
    ),
  lastName: z
    .string()
    .min(2, "نام خانوادگی خیلی کوتاه است")
    .regex(
      /^[\u0600-\u06FF\s]+$/,
      "نام خانوادگی فقط باید فارسی باشد"
    ),
  nationalId: z
    .string()
    .length(10, "کد ملی باید ۱۰ رقم باشد")
    .regex(/^\d{10}$/, "کد ملی فقط باید عدد باشد")
    .refine((value) => isValidNationalId(value), {
      message: "کد ملی معتبر نیست",
    }),

  phone: z
    .string()
    .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),

  email: z
    .string()
    .email("ایمیل معتبر نیست"),

//   birthDate: z
//     .string()
//     .regex(
//       /^(13|14)\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/,
//       "فرمت تاریخ باید شمسی باشد (مثال: 1370/01/01)"
//     ),
  day: z.string(),
  month: z.string(),
  year: z.string(),
//   job: z
//     .string()
//     .min(2, "شغل کوتاه است")
//     .regex(/^[\u0600-\u06FFa-zA-Z\s]+$/, "شغل نامعتبر است"),
});