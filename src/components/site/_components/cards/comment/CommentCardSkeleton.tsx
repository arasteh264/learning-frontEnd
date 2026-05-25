export default function CommentCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse h-full">
      <div className="flex items-center gap-3">
        <div className="size-14 rounded-full bg-gray-200" />

        <div className="flex flex-col gap-2">
          <div className="w-24 h-3 bg-gray-200 rounded" />
          <div className="w-18 h-2 bg-gray-100 rounded" />
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-5">
        <div className="w-full h-3 bg-gray-100 rounded" />
        <div className="w-full h-3 bg-gray-100 rounded" />
        <div className="w-2/3 h-3 bg-gray-100 rounded" />
      </div>

      <div className="flex gap-1 mt-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="size-4 rounded bg-gray-200"
          />
        ))}
      </div>
    </div>
  );
}