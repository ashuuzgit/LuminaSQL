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

const footerItems: NavItem[] = [
  { label: "Documentation", icon: "📘" },
  { label: "Support", icon: "🛠️" },
];

export default function Sidebar({ activeNav, onNavigate }: SidebarProps) {
  return (
    <aside className="w-60 shrink-0 bg-white border-r border-[#e2e8f0] px-6 py-7 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="h-11 w-11 rounded-2xl bg-[#003d9b] text-white grid place-items-center text-lg font-bold">
            W
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">Workspace</div>
            <div className="text-xs text-slate-500">Pro Plan</div>
          </div>
        </div>

        <button className="w-full rounded-xl bg-[#003d9b] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#002e7d]">
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
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                  isActive
                    ? "bg-[#dae2ff] text-[#003d9b] border-l-4 border-[#003d9b]"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3 text-sm text-slate-600">
        {footerItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left hover:bg-slate-50"
            onClick={() => onNavigate(item.label)}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  );
}
