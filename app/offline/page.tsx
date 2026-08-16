"use client";
export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="text-6xl">📡</div>
      <h1 className="text-xl font-bold text-gray-900">
        اتصال اینترنت برقرار نیست
      </h1>
      <p className="text-gray-500">
        به نظر می‌رسه آفلاینی. لطفاً اتصالت رو چک کن و دوباره امتحان کن.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="rounded-xl bg-brand px-6 py-2.5 text-white font-medium"
      >
        تلاش دوباره
      </button>
    </div>
  );
}