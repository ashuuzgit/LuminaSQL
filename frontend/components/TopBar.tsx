import { UserButton } from "@clerk/nextjs";

interface TopBarProps {
  title: string;
}

export default function TopBar({ title }: TopBarProps) {
  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-8 py-3">
      <h1 className="heading-golden text-slate-100">
        {title}
      </h1>

      <div className="flex items-center gap-4">
        <div className="rounded-full bg-slate-900 px-4 py-2 text-sm text-slate-300">
          No new notifications
        </div>
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </header>
  );
}