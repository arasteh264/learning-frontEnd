"use client";

import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getArticleById, Article } from "@/src/services/article/article";

type ArticleWithAuthor = Article & {
  teachers?: {
    id: string;
    bio: string;
    avatar?: string;
  };
};

export default function ArticleDetailPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : null;

  const {
    data: article,
    isLoading,
    isError,
  } = useQuery<ArticleWithAuthor>({
    queryKey: ["article", id],
    queryFn: () => getArticleById(id as string),
    enabled: !!id,
  });

  const schema = useMemo(
    () => ({
      ...defaultSchema,
      tagNames: [
        ...(defaultSchema.tagNames ?? []),
        "table",
        "thead",
        "tbody",
        "tr",
        "th",
        "td",
      ],
      attributes: {
        ...defaultSchema.attributes,
        th: ["align"],
        td: ["align"],
      },
    }),
    [],
  );

  if (isLoading) return <div>در حال لود...</div>;
  if (isError || !article) return <div>مقاله پیدا نشد</div>;

  const author = article.teachers;

  const createdDate = new Date(article.created_at).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const readTime = Math.max(
    1,
    Math.ceil(article.content.split(/\s+/).length / 200),
  );

  const cleanContent = article.content.replace(/\r\n/g, "\n");

  return (
    <section className="container-custom mt-10 flex flex-col text-right px-5">
      <h1 className="text-sm font-extrabold border-b border-gray-200 py-3">
        {article.title}
      </h1>

      <div className="flex items-center gap-2 justify-end pt-2">
        <span className="text-xs text-gray-500">{createdDate}</span>

        {author && (
          <>
            <span className="text-xs text-gray-500">{author.bio}</span>
            <Image
              src={author.avatar || "/images/default-avatar.png"}
              alt={author.bio || "نویسنده"}
              width={24}
              height={24}
              className="rounded-full size-6"
            />
          </>
        )}
      </div>

      <span className="text-xs text-gray-500">{readTime} دقیقه مطالعه</span>

      {article.cover && (
        <div className="w-full flex justify-center py-5">
          <Image
            src={article.cover}
            alt={article.title}
            width={400}
            height={300}
            className="rounded-2xl object-cover"
          />
        </div>
      )}

      <div
        className="prose prose-sm max-w-none text-sm text-gray-700 leading-7"
        dir="rtl"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[[rehypeSanitize, schema]]}
        >
          {cleanContent}
        </ReactMarkdown>
      </div>
    </section>
  );
}
