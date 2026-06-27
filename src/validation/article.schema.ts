import { z } from "zod"

export const articleSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است"),
  content: z.string().min(1, "محتوا الزامی است"),
  status: z.enum(["draft", "published", "archived"]), 
  category: z.string().min(1),
  author: z.string().min(1),
  slug: z.string().optional(),
  summary: z.string().optional(),
})

export type ArticleFormValues = z.infer<typeof articleSchema>
