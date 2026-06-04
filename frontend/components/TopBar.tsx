import { UserButton } from "@clerk/nextjs";

interface TopBarProps {
  title: string;
  onToggleSidebar?: () => void;
  showHamburger?: boolean;
}

export default function TopBar({ title, onToggleSidebar, showHamburger }: TopBarProps) {
  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 md:px-8 py-3">
      <div className="flex items-center gap-4">
        {showHamburger && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-slate-800 rounded-lg transition"
            aria-label="Toggle menu"
          >
            <span className="w-6 h-0.5 bg-slate-100 block"></span>
            <span className="w-6 h-0.5 bg-slate-100 block"></span>
            <span className="w-6 h-0.5 bg-slate-100 block"></span>
          </button>
        )}
        <h1 className="heading-golden text-slate-100 whitespace-nowrap">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:block rounded-full bg-slate-900 px-4 py-2 text-sm text-slate-300">
          No new notifications
        </div>
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </header>
  );
}