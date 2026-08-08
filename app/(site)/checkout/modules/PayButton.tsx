import { CreditCard, Loader2 } from "lucide-react";

export default function PayButton({
  processing,
  onClick,
  free,
}: {
  processing: boolean;
  onClick: () => void;
  free: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={processing}
      className="w-full flex items-center justify-center gap-2
        py-3.5 rounded-xl bg-green-600 hover:bg-green-700
        text-white text-sm font-medium transition-colors
        active:scale-[0.98]
        disabled:opacity-60 disabled:active:scale-100"
    >
      {processing ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <CreditCard size={18} />
      )}
      {processing
        ? "در حال انتقال به درگاه..."
        : free
        ? "فعال‌سازی رایگان"
        : "پرداخت و تکمیل خرید"}
    </button>
  );
}