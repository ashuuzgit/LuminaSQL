interface TopBarProps {
  title: string;
}

export default function TopBar({ title }: TopBarProps) {
  return (
    <header className="flex items-center justify-between border-b border-[#e7eeff] bg-white px-8 py-3">
      <h1 className="font-[var(--font-manrope)] text-xl font-semibold text-[#003d9b]">{title}</h1>

      <div className="flex items-center gap-4">
        {['🔔', '❓', '⚙️'].map((icon) => (
          <button key={icon} type="button" className="rounded-full p-2 text-slate-500 hover:bg-slate-100">
            <span>{icon}</span>
          </button>
        ))}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#003d9b] text-sm font-semibold text-white">
          LS
        </div>
      </div>
    </header>
  );
}
