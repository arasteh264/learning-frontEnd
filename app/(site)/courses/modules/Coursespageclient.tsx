"use client";

import CourseCard, { CourseCardData } from "./filter/Coursecard";
import CoursesFilter from "./filter/coursesFilter";
import EmptyState from "./filter/Emptystate";
import Pagination from "./filter/Pagination";
import ResponsivePanel from "./filter/ResponsivePanel";
import { useCoursesFilter } from "./filter/Usecoursesfilter";
import { useResponsivePanel } from "./filter/useResponsivePanel";
import IntroCourses from "./introCourses";


interface Props {
  courses: CourseCardData[];
}

export default function CoursesPageClient({ courses }: Props) {
  const { activePanel, open, close } = useResponsivePanel();

  const {
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
    page,
    setPage,
    totalPages,
    totalResults,
    paginatedCourses,
    activeFilterCount,
    resetFilters,
  } = useCoursesFilter({ courses });

  return (
    <section className="container-custom">
      <IntroCourses />

      <CoursesFilter
        open={open}
        search={search}
        onSearchChange={setSearch}
        activeFilterCount={activeFilterCount}
      />

      <div className="flex items-center justify-between px-1 pb-4 text-xs text-zinc-500">
        <span>{totalResults.toLocaleString("fa-IR")} دوره پیدا شد</span>

        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="font-medium text-zinc-900 hover:underline"
          >
            پاک کردن فیلترها
          </button>
        )}
      </div>

      {paginatedCourses.length === 0 ? (
        <EmptyState onClear={resetFilters} />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}

      <ResponsivePanel
        open={!!activePanel}
        type={activePanel}
        onClose={close}
        filterProps={{
          selectedCategories,
          onToggleCategory: toggleCategory,
          onlyFree,
          onFreeChange: setOnlyFree,
          onlyPreSale,
          onPreSaleChange: setOnlyPreSale,
          onApply: close,
          onClear: resetFilters,
          resultCount: totalResults,
        }}
        sortProps={{ active: sort, onChange: setSort }}
      />
    </section>
  );
}