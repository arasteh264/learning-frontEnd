export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-green-400 opacity-20 blur-xl animate-pulse" />

        <div className="w-14 h-14 rounded-full border-4 border-green-200 border-t-green-600 animate-spin" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}
