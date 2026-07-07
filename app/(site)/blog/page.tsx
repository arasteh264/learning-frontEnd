"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useArticlesByCategory, useCategories } from "@/src/services/article";
import { FileQuestion } from "lucide-react";

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const {
    data,
    isLoading: articlesLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useArticlesByCategory(selectedCategory ?? "");

  const articles = data?.pages.flat() ?? [];

  useEffect(() => {
    if (!selectedCategory && categories && categories.length > 0) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories, selectedCategory]);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">
          مقالات
        </h1>
        <p className="text-sm text-muted mt-1">
          آخرین آموزش‌ها و مقاله‌های یاددای رو این‌جا دنبال کن
        </p>
      </div>

      {/* categories */}
      {categoriesLoading ? (
        <div className="flex gap-2 mb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-9 w-20 rounded-full bg-surface-2 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible no-scrollbar">
          {categories?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat.id
                  ? "bg-brand text-white"
                  : "bg-surface text-muted hover:bg-surface-2"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      )}

      {/* articles grid */}
      {selectedCategory && articlesLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border overflow-hidden">
              <div className="w-full h-40 bg-surface-2 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-3 w-4/5 bg-surface-2 rounded animate-pulse" />
                <div className="h-3 w-2/5 bg-surface-2 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCategory && !articlesLoading && articles.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center py-16">
          <div className="w-14 h-14 rounded-full bg-surface-2 flex items-center justify-center mb-4">
            <FileQuestion size={26} className="text-muted" />
          </div>
          <p className="text-foreground font-medium mb-1">
            مقاله‌ای در این دسته پیدا نشد
          </p>
          <p className="text-sm text-muted">دسته‌بندی دیگری رو امتحان کن</p>
        </div>
      )}

      {articles.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="article-card group rounded-2xl border border-border bg-surface overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${(index % 9) * 40}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={article.cover}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {article.categories?.title && (
                    <span className="absolute top-2 right-2 text-[11px] bg-brand text-white px-2.5 py-1 rounded-full">
                      {article.categories.title}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm text-foreground line-clamp-2 group-hover:text-brand transition-colors">
                    {article.title}
                  </h3>
                  {article.summary && (
                    <p className="text-xs text-muted mt-1.5 line-clamp-2">
                      {article.summary}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* infinite scroll sentinel + states */}
          <div ref={sentinelRef} className="h-10" />

          {isFetchingNextPage && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border overflow-hidden">
                  <div className="w-full h-40 bg-surface-2 animate-pulse" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 w-4/5 bg-surface-2 rounded animate-pulse" />
                    <div className="h-3 w-2/5 bg-surface-2 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!hasNextPage && !isFetchingNextPage && (
            <p className="text-center text-xs text-muted mt-8">
              همه‌ی مقاله‌ها نمایش داده شد
            </p>
          )}
        </>
      )}

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .article-card {
          animation: fadeIn 0.4s ease-out both;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}