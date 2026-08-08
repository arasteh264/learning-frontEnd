"use client";

import { useSearchCourse } from "@/src/services/course";
import { Search, ChevronLeft, SmilePlus, X, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "antd";

type Props = {
  onResults?: (results: any[]) => void;
};

const MIN_QUERY_LENGTH = 3;

export default function SearchBox({ onResults }: Props) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<any>(null);

  // Debounce typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const isQueryLongEnough = debouncedQuery.length >= MIN_QUERY_LENGTH;

  const { data, isFetching } = useSearchCourse(
    isQueryLongEnough ? debouncedQuery : ""
  );

  useEffect(() => {
    if (data) {
      onResults?.(data);
    }
  }, [data, onResults]);

  // Open dropdown once we actually have something to show
  useEffect(() => {
    if (query.trim().length > 0) {
      setDropdownOpen(true);
    } else {
      setDropdownOpen(false);
    }
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on Escape
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setDropdownOpen(false);
      inputRef.current?.blur?.();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setDebouncedQuery(query.trim());
    setDropdownOpen(true);
  };

  const handleClear = () => {
    setQuery("");
    setDebouncedQuery("");
    setDropdownOpen(false);
    inputRef.current?.focus?.();
  };

  const showDropdown = dropdownOpen && query.trim().length > 0;
  const showHint = showDropdown && !isQueryLongEnough;
  const showResults = showDropdown && isQueryLongEnough;

  return (
    // px-4 keeps a safe gutter from the screen edges on mobile,
    // and the whole block stays centered with a sensible max width.
    <div className="w-full px-4 sm:px-6">
      <div
        ref={wrapperRef}
        className="relative w-full max-w-2xl mx-auto"
        onKeyDown={handleKeyDown}
      >
        <form
          onSubmit={handleSubmit}
          className={`
            w-full
            mt-7
            bg-background
            rounded-2xl
            shadow-md
            border border-border
            flex items-center gap-2
            p-2
            md:p-3
            transition-all duration-300
            ${focused ? "ring-2 ring-brand/20 border-brand" : ""}
          `}
        >
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              setFocused(true);
              if (query.trim().length > 0) setDropdownOpen(true);
            }}
            onBlur={() => setFocused(false)}
            placeholder="دنبال چه دوره‌ای می‌گردی؟"
            allowClear={false}
            suffix={
              query ? (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="پاک کردن جستجو"
                  className="
                    text-muted
                    hover:text-foreground
                    transition-colors
                    p-1
                    -m-1
                    rounded-full
                  "
                >
                  <X size={16} />
                </button>
              ) : null
            }
            className="
              !border-none
              focus:!ring-0
              flex-1
              min-w-0
              bg-transparent
              outline-none
              text-sm
              md:text-base
              placeholder:text-muted
              h-11
              focus:placeholder:text-transparent
            "
          />

          <button
            type="submit"
            aria-label="جستجو"
            className="
              shrink-0
              h-11
              w-11
              sm:w-auto
              px-0
              sm:px-5
              rounded-xl
              bg-brand
              text-white
              flex items-center justify-center gap-2
              text-sm
              font-medium
              transition-colors
              hover:opacity-90
              active:scale-95
            "
          >
            {isFetching ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Search size={18} />
            )}
            <span className="hidden sm:inline">جستجو</span>
          </button>
        </form>

        {showDropdown && (
          <div
            className="
              absolute
              top-full
              left-0
              right-0
              mt-2
              bg-background
              rounded-2xl
              shadow-lg
              border border-border
              z-50
              overflow-hidden
              animate-in fade-in slide-in-from-top-1 duration-150
            "
          >
            <div className="max-h-[65vh] md:max-h-[26rem] overflow-y-auto overscroll-contain">
              {showHint && (
                <div className="p-5 text-center">
                  <p className="text-sm text-muted">
                    برای جستجو حداقل {MIN_QUERY_LENGTH} حرف وارد کنید
                  </p>
                </div>
              )}

              {showResults && isFetching && (
                <div className="p-8 text-center">
                  <div
                    className="
                      w-6 h-6
                      mx-auto mb-3
                      border-2 border-border
                      border-t-brand
                      rounded-full
                      animate-spin
                    "
                  />
                  <p className="text-sm text-muted">در حال جستجو...</p>
                </div>
              )}

              {showResults && !isFetching && data?.length === 0 && (
                <div className="p-8 text-center">
                  <div
                    className="
                      w-14 h-14
                      mx-auto mb-4
                      rounded-full
                      bg-surface-2
                      flex items-center justify-center
                    "
                  >
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

              {showResults && !isFetching && data && data.length > 0 && (
                <ul className="divide-y divide-border text-right">
                  {data.map((course: any) => (
                    <li key={course.id}>
                      <Link
                        href={course.href || `/courses/${course.id}`}
                        onClick={() => setDropdownOpen(false)}
                        className="
                          flex
                          items-center
                          gap-3
                          p-3
                          hover:bg-surface
                          active:bg-surface
                          transition-colors
                        "
                      >
                        {course.cover && (
                          <Image
                            src={course.cover}
                            alt={course.name}
                            width={60}
                            height={60}
                            className="
                              w-12 h-12
                              sm:w-14 sm:h-14
                              rounded-lg
                              object-cover
                              shrink-0
                            "
                          />
                        )}

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {course.name}
                          </p>
                          <p className="text-xs text-muted truncate mt-1">
                            {course.description}
                          </p>
                        </div>

                        <ChevronLeft
                          size={18}
                          className="text-muted shrink-0"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}