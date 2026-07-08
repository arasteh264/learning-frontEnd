import { SearchX } from "lucide-react";

export default function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100">
        <SearchX size={26} className="text-zinc-400" />
      </div>

      <h3 className="text-sm font-bold text-zinc-800">دوره‌ای پیدا نشد</h3>

      <p className="max-w-xs text-xs text-zinc-500">
        با فیلترهای فعلی نتیجه‌ای وجود نداره. فیلترها رو تغییر بده یا پاک کن.
      </p>

      <button
        onClick={onClear}
        className="mt-2 rounded-xl bg-zinc-900 px-5 py-2 text-xs font-medium text-white transition hover:bg-zinc-800"
      >
        حذف همه فیلترها
      </button>
    </div>
  );
}