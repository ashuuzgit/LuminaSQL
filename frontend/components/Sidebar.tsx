"use client";

interface NavItem {
  label: string;
  icon: string;
}

interface SidebarProps {
  activeNav: string;
  onNavigate: (value: string) => void;
}

const navItems: NavItem[] = [
  { label: "Uploads", icon: "📤" },
  { label: "Queries", icon: "🧠" },
  { label: "History", icon: "📜" },
];

export default function Sidebar({ activeNav, onNavigate }: SidebarProps) {
  return (
    <aside className="w-60 shrink-0 bg-slate-950 border-r border-slate-800 px-6 py-7 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="h-11 w-11 rounded-2xl bg-[#003d9b] text-white grid place-items-center text-lg font-bold">
            W
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-100">Workspace</div>
            <div className="text-xs text-slate-400">Pro Plan</div>
          </div>
        </div>

        <button className="btn-primary w-full bg-[#003d9b] text-white transition hover:bg-[#002e7d]">
          + New Project
        </button>

        <div className="mt-10 space-y-2">
          {navItems.map((item) => {
            const isActive = item.label === activeNav;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onNavigate(item.label)}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
                  isActive
                    ? "border-slate-400 bg-slate-800 text-slate-100 shadow-inner"
                    : "border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500 hover:bg-slate-800"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
