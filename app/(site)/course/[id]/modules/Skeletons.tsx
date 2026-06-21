export function HeroSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start animate-pulse">
      <div className="flex flex-col gap-6 order-2 lg:order-1">
        <div className="space-y-4">
          <div className="h-8 w-3/4 bg-gray-200 rounded-lg" />
          <div className="h-4 w-full bg-gray-100 rounded-lg" />
          <div className="h-4 w-2/3 bg-gray-100 rounded-lg" />
        </div>
        <div className="h-24 w-full bg-gray-100 rounded-xl" />
        <div className="h-16 w-full bg-gray-100 rounded-xl" />
      </div>
      <div className="aspect-video w-full bg-gray-200 rounded-2xl order-1 lg:order-2" />
    </div>
  );
}

export function StatsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-[#fafafa] rounded-xl p-5 flex flex-col items-center gap-4"
        >
          <div className="size-12 rounded-2xl bg-gray-200" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}

export function SessionSkeleton() {
  return (
    <section className="py-5 mt-5 bg-[#fafafa] rounded-xl p-5 animate-pulse">
      <div className="flex justify-end items-center gap-1 mb-4">
        <div className="h-5 w-16 bg-gray-200 rounded" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-xl h-14" />
        ))}
      </div>
    </section>
  );
}