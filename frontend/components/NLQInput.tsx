interface NLQInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  disabled: boolean;
}

export default function NLQInput({ value, onChange, onSubmit, loading, disabled }: NLQInputProps) {
  return (
    <div className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-800 text-slate-100">
          ✨
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ask a question about your data (e.g., Show all rows where amount is greater than 500)"
          className="flex-1 border-none bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:ring-0 disabled:cursor-not-allowed disabled:text-slate-500"
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
          className="btn-primary rounded-full bg-[#003d9b] text-white transition hover:bg-[#002e7d] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Running..." : "Run Query"}
        </button>
      </div>
    </div>
  );
}
