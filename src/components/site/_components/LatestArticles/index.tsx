import SectionHeader from "../ContentSectionHeader";
import Link from "next/link";
import { ArrowLeft, Newspaper } from "lucide-react";
import ArticleCard from "../cards/article/ArticleCard";
import EmptyState from "@/src/components/base/EmptyState";
import { useQuery } from "@tanstack/react-query";
import { getAllArticles, getLatestArticles } from "@/src/services/article";

export default async function LatestArticles() {
  const data = (await getLatestArticles()) ?? [];
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
      {articles.length === 0 ? (
        <EmptyState message="مقاله‌ای موجود نیست" icon={Newspaper} />
      ) : (
        <div dir="rtl" className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
