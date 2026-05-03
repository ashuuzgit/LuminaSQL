interface ProgressBarProps {
  value: number;
  animated?: boolean;
}

export default function ProgressBar({ value, animated = false }: ProgressBarProps) {
  return (
    <div className="rounded-full bg-[#d7e3fb] p-1">
      <div
        className={`h-2 rounded-full bg-[#0052cc] transition-all duration-300 ${animated ? "animate-stripes" : ""}`}
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
}
