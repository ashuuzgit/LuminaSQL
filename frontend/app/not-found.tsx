import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#0b1220] px-6">
      <div className="max-w-md rounded-3xl border border-slate-700 bg-slate-950 p-10 text-center shadow-card">
        <h1 className="text-3xl font-semibold text-slate-100">Page not found</h1>
        <p className="mt-4 text-sm text-slate-400">The page you are looking for does not exist.</p>
        <Link href="/dashboard" className="mt-8 btn-primary bg-[#003d9b] text-white transition hover:bg-[#002e7d]">
          Go back to dashboard
        </Link>
      </div>
    </div>
  );
}
