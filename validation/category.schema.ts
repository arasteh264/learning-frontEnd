import { z } from "zod";

export const categorySchema = z.object({
  title: z.string().min(2, "عنوان باید حداقل ۲ کاراکتر باشد"),
  href: z.string().min(2, "لینک الزامی است").regex(/^\/.+$/, "لینک باید با / شروع شود"),
});