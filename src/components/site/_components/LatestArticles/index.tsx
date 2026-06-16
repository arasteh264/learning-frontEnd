"use client";

import SectionHeader from "../ContentSectionHeader";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ArticleCard from "../cards/article/ArticleCard";

import { useQuery } from "@tanstack/react-query";
import { getAllArticles } from "@/src/services/article";

export default function LatestArticles() {
const { data, isLoading } = useQuery({
  queryKey: ["articles", "published"],
  queryFn: () => getAllArticles("published"),
});

  const articles = data ?? [];

  return (
    <section className="space-y-10 container-custom">
      <SectionHeader
        title="آخرین"
        highlight="مقالات"
        action={
          <Link
            href="/blog"
            className="flex items-center gap-x-2 text-label sm:text-caption hover:text-[var(--brand)] transition-colors"
          >
            <ArrowLeft className="size-4" />
            همه مقالات
          </Link>
        }
      />

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-xl bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {articles.map((article: any) => (
            <ArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
              href={`/blog/${article.slug}`}
              image={article.cover}
              description={article.summary}
              author={{
                name: article.teachers?.bio || "ناشناس",
                avatar: article.teachers?.avatar || "/slider/1.webp",
              }}
              readTime={article.readTime || 5}
            />
          ))}
        </div>
      )}
    </section>
  );
}