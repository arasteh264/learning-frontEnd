"use client";

import { useMemo, useState } from "react";
import { CourseCardData } from "./Coursecard";

export type SortId =
  | "latest"
  | "oldest"
  | "popular"
  | "cheap"
  | "expensive"
  | "rating";

const PAGE_SIZE = 12;

interface UseCoursesFilterParams {
  courses: CourseCardData[];
}

export function useCoursesFilter({ courses }: UseCoursesFilterParams) {
  const [search, setSearchState] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [onlyFree, setOnlyFreeState] = useState(false);
  const [onlyPreSale, setOnlyPreSaleState] = useState(false);
  const [sort, setSort] = useState<SortId>("latest");
  const [page, setPage] = useState(1);

  const setSearch = (value: string) => {
    setSearchState(value);
    setPage(1);
  };

  const setOnlyFree = (value: boolean) => {
    setOnlyFreeState(value);
    setPage(1);
  };

  const setOnlyPreSale = (value: boolean) => {
    setOnlyPreSaleState(value);
    setPage(1);
  };

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
    setPage(1);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setOnlyFreeState(false);
    setOnlyPreSaleState(false);
    setSearchState("");
    setPage(1);
  };

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return courses.filter((course) => {
      const categoryId = course.categories?.id ?? course.category_id;
      const matchesCategory =
        selectedCategories.length === 0 ||
        (!!categoryId && selectedCategories.includes(categoryId));

      const matchesSearch =
        query.length === 0 || course.name.toLowerCase().includes(query);

      const price = Number(course.price) || 0;
      const finalPrice = price - (price * (course.discount ?? 0)) / 100;
      const matchesFree = !onlyFree || finalPrice <= 0;

      // اگر فیلد presale در داده وجود نداشته باشه، این فیلتر بی‌اثر می‌مونه
      const matchesPreSale =
        !onlyPreSale || (course as { presale?: boolean }).presale === true;

      return matchesCategory && matchesSearch && matchesFree && matchesPreSale;
    });
  }, [courses, selectedCategories, search, onlyFree, onlyPreSale]);

  const sorted = useMemo(() => {
    const list = [...filtered];

    switch (sort) {
      case "oldest":
        return list.sort(
          (a, b) =>
            new Date(a.created_at ?? 0).getTime() -
            new Date(b.created_at ?? 0).getTime()
        );
      case "popular":
        return list.sort(
          (a, b) => (b.enrolled_count ?? 0) - (a.enrolled_count ?? 0)
        );
      case "cheap":
        return list.sort((a, b) => Number(a.price) - Number(b.price));
      case "expensive":
        return list.sort((a, b) => Number(b.price) - Number(a.price));
      case "rating":
        return list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      case "latest":
      default:
        return list.sort(
          (a, b) =>
            new Date(b.created_at ?? 0).getTime() -
            new Date(a.created_at ?? 0).getTime()
        );
    }
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginatedCourses = sorted.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const activeFilterCount =
    selectedCategories.length + (onlyFree ? 1 : 0) + (onlyPreSale ? 1 : 0);

  return {
    search,
    setSearch,
    selectedCategories,
    toggleCategory,
    onlyFree,
    setOnlyFree,
    onlyPreSale,
    setOnlyPreSale,
    sort,
    setSort,
    page: safePage,
    setPage,
    totalPages,
    totalResults: sorted.length,
    paginatedCourses,
    activeFilterCount,
    resetFilters,
  };
}