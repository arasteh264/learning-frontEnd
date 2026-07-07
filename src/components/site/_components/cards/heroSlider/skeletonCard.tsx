export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded-xl overflow-hidden shadow-sm">
      <div className="h-45 md:h-120 bg-gray-200" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-3/4" />
        <div className="h-2 bg-gray-100 rounded w-1/3" />
      </div>
    </div>
  );
}