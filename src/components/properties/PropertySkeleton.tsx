export default function PropertySkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-white/40 bg-white/70 p-5 shadow-md backdrop-blur">
      <div className="h-40 rounded-2xl bg-neutral-200" />
      <div className="mt-4 h-4 w-1/2 rounded-full bg-neutral-200" />
      <div className="mt-3 h-3 w-3/4 rounded-full bg-neutral-200" />
      <div className="mt-4 flex gap-2">
        <div className="h-6 w-20 rounded-full bg-neutral-200" />
        <div className="h-6 w-24 rounded-full bg-neutral-200" />
      </div>
      <div className="mt-6 h-10 w-full rounded-full bg-neutral-200" />
    </div>
  );
}
