type SkeletonLoaderProps = {
  className?: string;
};

export default function SkeletonLoader({ className }: SkeletonLoaderProps) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-picasso-brown/15 ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}
