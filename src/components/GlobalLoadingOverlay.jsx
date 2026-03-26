import { useUIStore } from "@/store/ui";

export function GlobalLoadingOverlay() {
  const { globalLoading, globalLoadingText } = useUIStore();

  if (!globalLoading) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60">
      <div className="flex flex-col items-center gap-3 rounded-xl bg-white p-6 shadow-xl">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        <p className="text-sm font-semibold text-gray-700">{globalLoadingText}</p>
      </div>
    </div>
  );
}
