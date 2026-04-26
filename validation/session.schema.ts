import { z } from "zod";

export const sessionSchema = z.object({
  title: z.string().min(2, "عنوان الزامی است"),

  time: z.string().min(1, "زمان الزامی است"),

  free: z.boolean(),

  video: z.string().min(1, "ویدیو الزامی است"),

  course: z.string().min(1, "انتخاب دوره الزامی است"),
});