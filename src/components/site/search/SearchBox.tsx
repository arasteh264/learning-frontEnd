"use client";
import { useSearchCourse } from "@/src/services/course";
import { Search, ChevronLeft, SmilePlus } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

type Props = {
  onResults?: (results: any[]) => void;
};

export default function SearchBox({ onResults }: Props) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const { data, isFetching } = useSearchCourse(debouncedQuery);

  useEffect(() => {
    if (data) {
      onResults?.(data);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setDebouncedQuery(query.trim());
  };

  const showDropdown = debouncedQuery.length >= 3;

  return (
    <div className="container-custom mt-8 relative">
      <form
        onSubmit={handleSubmit}
        className={`
          w-full max-w-3xl mx-auto
          bg-background rounded-2xl
          shadow-md border border-border
          flex items-center gap-2
          p-2 md:p-3
          transition-all duration-300
          ${focused ? "ring-2 ring-brand/20 border-brand" : ""}
        `}
      >
        <div
          className="
            flex items-center justify-center
            w-11 h-11 rounded-xl
            bg-brand-light text-brand
            shrink-0
          "
        >
          <Search size={20} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="دنبال چه دوره‌ای می‌گردی؟"
          className="
            flex-1 bg-transparent outline-none
            text-sm md:text-base
            placeholder:text-muted
            h-11
          "
        />
        <button
          type="submit"
          className="
            h-11 px-4 md:px-6
            rounded-xl
            bg-brand hover:bg-brand-dark
            text-white text-sm md:text-base
            transition-colors duration-300
            shrink-0
          "
        >
          جستجو
        </button>
      </form>

      {showDropdown && (
        <div
          className="
            w-full max-w-3xl mx-auto mt-2
            bg-background rounded-2xl
            shadow-md border border-border
            overflow-hidden
            absolute left-1/2 -translate-x-1/2 right-0 z-10
          "
        >
          {isFetching && (
            <div className="p-8 text-center">
              <div className="w-6 h-6 mx-auto mb-3 border-2 border-border border-t-brand rounded-full animate-spin" />
              <p className="text-sm text-muted">در حال جستجو...</p>
            </div>
          )}

          {!isFetching && data?.length === 0 && (
            <div className="p-10 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-surface-2 flex items-center justify-center">
                <SmilePlus size={28} className="text-muted" />
              </div>
              <p className="text-base font-medium text-foreground mb-1">
                دوره‌ای یافت نشد
              </p>
              <p className="text-sm text-muted">
                عبارت دیگری را امتحان کنید
              </p>
            </div>
          )}

          {!isFetching && data && data.length > 0 && (
            <ul className="divide-y divide-border text-right">
              {data.map((course: any) => (
                <li key={course.id}>
                  <Link
                    href={course.href || `/courses/${course.id}`}
                    className="
                      flex items-center gap-3 p-3
                      hover:bg-surface transition-colors
                    "
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {course.name}
                      </p>
                      <p className="text-xs text-muted truncate">
                        {course.description}
                      </p>
                    </div>
                    <ChevronLeft size={18} className="text-muted shrink-0" />
                    {course.cover && (
                      <Image
                        src={course.cover}
                        alt={course.name}
                        width={60}
                        height={60}
                        className="w-15 h-15 rounded-lg object-cover shrink-0"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}