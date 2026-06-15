import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(3, "عنوان باید حداقل ۳ کاراکتر باشد"),
  slug: z.string().optional(),
  summary: z.string().max(300, "خلاصه نباید بیشتر از ۳۰۰ کاراکتر باشد").optional(),
  content: z.string().min(10, "محتوای مقاله الزامی است"),
  status: z.enum(["draft", "published"]),
  category: z.string().min(1, "دسته‌بندی الزامی است"),
  author: z.string().min(1, "نویسنده الزامی است"),
});

export type ArticleFormValues = z.infer<typeof articleSchema>;