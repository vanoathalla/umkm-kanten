export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-white/5 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10">
      <div className="h-44 bg-gray-200 dark:bg-white/10 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-white/10 animate-pulse shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3.5 bg-gray-200 dark:bg-white/10 animate-pulse rounded-full w-3/4" />
            <div className="h-2.5 bg-gray-200 dark:bg-white/10 animate-pulse rounded-full w-1/2" />
          </div>
        </div>
        <div className="h-2.5 bg-gray-200 dark:bg-white/10 animate-pulse rounded-full w-full" />
        <div className="h-2.5 bg-gray-200 dark:bg-white/10 animate-pulse rounded-full w-5/6" />
        <div className="flex items-center justify-between pt-1">
          <div className="h-2.5 bg-gray-200 dark:bg-white/10 animate-pulse rounded-full w-16" />
          <div className="h-2.5 bg-gray-200 dark:bg-white/10 animate-pulse rounded-full w-20" />
        </div>
      </div>
    </div>
  );
}
