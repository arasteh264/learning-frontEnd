export default function CourseCardSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 rounded-xl border border-gray-100 bg-white overflow-hidden animate-pulse h-full">

      {/* image */}
      <div className="sm:w-40 w-full">
        <div className="w-full aspect-video sm:h-full bg-gray-200" />
      </div>

      {/* content */}
      <div className="flex flex-col justify-between gap-3 px-3 sm:px-5 py-3 w-full">

        {/* title + desc */}
        <div className="flex flex-col gap-2">
          <div className="h-3 w-3/4 bg-gray-200 rounded" />
          <div className="h-3 w-1/2 bg-gray-200 rounded" />
          <div className="h-2 w-full bg-gray-100 rounded hidden sm:block" />
          <div className="h-2 w-5/6 bg-gray-100 rounded hidden sm:block" />
        </div>

        {/* bottom */}
        <div className="flex flex-col gap-3">

          {/* author + rating */}
          <div className="flex items-center justify-between border-b border-gray-100 py-2">

            <div className="flex items-center gap-2">
              <div className="size-6 rounded-full bg-gray-200" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>

            <div className="h-3 w-10 bg-gray-200 rounded" />
          </div>

          {/* price + students */}
          <div className="flex items-end justify-between pb-3">

            {/* students */}
            <div className="flex items-center gap-2">
              <div className="h-3 w-8 bg-gray-200 rounded" />
              <div className="size-4 bg-gray-200 rounded" />
            </div>

            {/* price */}
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-10 bg-gray-200 rounded" />
                <div className="h-4 w-8 bg-gray-200 rounded" />
              </div>
              <div className="h-3 w-20 bg-gray-200 rounded" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}