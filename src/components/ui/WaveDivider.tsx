type WaveDividerProps = {
  className?: string;
};

export default function WaveDivider({ className }: WaveDividerProps) {
  return (
    <div className={className ?? ""} aria-hidden="true">
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,64C1200,75,1320,85,1380,90.7L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          className="fill-picasso-light"
        />
      </svg>
    </div>
  );
}
