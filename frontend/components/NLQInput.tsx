import { useState } from "react";

interface NLQInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  disabled: boolean;
  highlight?: boolean;
  onFocusChange?: (isFocused: boolean) => void;
}

export default function NLQInput({
  value,
  onChange,
  onSubmit,
  loading,
  disabled,
  highlight,
  onFocusChange,
}: NLQInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocusChange?.(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    onFocusChange?.(false);
  };

  return (
    <div
      className={`rounded-3xl border bg-slate-950 px-3 md:px-4 py-3 shadow-sm transition-all duration-500 ${
        highlight
          ? "animate-glow border-[#003d9b]"
          : "border-slate-700"
      }`}
    >
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Ask a question about your data"
          className="flex-1 border-none bg-transparent text-sm md:text-base text-slate-100 outline-none placeholder:text-slate-500 focus:ring-0 disabled:cursor-not-allowed disabled:text-slate-500 min-w-0"
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onSubmit();
            }
          }}
        />
        <button
          type="button"
          onClick={onSubmit}
          disabled={disabled || loading}
          className="btn-primary rounded-full bg-[#003d9b] text-white transition hover:bg-[#002e7d] disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap shrink-0 text-sm md:text-base"
        >
          {loading ? "Running..." : "Run"}
        </button>
      </div>
    </div>
  );
}
