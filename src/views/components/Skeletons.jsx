function SkeletonBlock({ className = "" }) {
  return (
    <div
      className={[
        "ui-skeleton animate-pulse rounded-xl bg-[color:rgba(150,194,219,0.25)]",
        className,
      ].join(" ")}
    />
  );
}

export function RecipeCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-[color:var(--ui-border)] bg-[color:rgba(255,255,255,0.85)]">
      <div className="aspect-[4/3]">
        <SkeletonBlock className="h-full w-full rounded-none" />
      </div>
      <div className="space-y-3 p-4 sm:p-5">
        <SkeletonBlock className="h-4 w-4/5" />
        <div className="flex flex-wrap gap-2">
          <SkeletonBlock className="h-6 w-24 rounded-full" />
          <SkeletonBlock className="h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function RecipeDetailSkeleton() {
  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-2xl border border-[color:var(--ui-border)] bg-[color:rgba(255,255,255,0.75)]">
        <div className="aspect-[16/10]">
          <SkeletonBlock className="h-full w-full rounded-none" />
        </div>
        <div className="space-y-3 p-5">
          <SkeletonBlock className="h-6 w-2/3" />
          <SkeletonBlock className="h-4 w-1/3" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[color:var(--ui-border)] bg-[color:rgba(255,255,255,0.75)] p-5">
          <SkeletonBlock className="h-5 w-32" />
          <div className="mt-4 space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonBlock key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[color:var(--ui-border)] bg-[color:rgba(255,255,255,0.75)] p-5">
          <SkeletonBlock className="h-5 w-32" />
          <div className="mt-4 space-y-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonBlock key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
