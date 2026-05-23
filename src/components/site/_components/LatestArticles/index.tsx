import SectionHeader from "../ContentSectionHeader";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ArticleCard from "../cards/article/ArticleCard";

export const articles = [
  {
    id: 1,
    title: "آشنایی با HTTP؛ ساختار، متدها و کدهای وضعیت",
    href: "/blog/what-is-http/",
    image: "/slider/1.webp",
    description:
      "در دنیای اینترنت هر بار که روی یک لینک کلیک می‌کنید...",
    author: {
      name: "شهرام خندقی",
      avatar:
  "/slider/1.webp",    },
    readTime: 8,
  },
  {
    id: 2,
    title: "دارک وب چیست؟",
    href: "/blog/what-is-dark-web/",
    image:
      "/slider/1.webp",
    description: "اکثر کاربران اینترنت محتوای آنلاین را از طریق...",
    author: {
      name: "شهرام خندقی",
      avatar:
  "/slider/1.webp",    },
    readTime: 10,
  },
];

export default function LatestArticles() {
  return (
    <section className="space-y-10 container-custom">
      <SectionHeader
        title="آخرین"
        highlight="مقالات"
        action={
          <Link
            href="/blog"
            className="flex items-center gap-x-2 text-label sm:text-caption hover:text-brand transition-colors"
          >
            <ArrowLeft className="size-4" />
            همه مقالات
          </Link>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </section>
  );
}