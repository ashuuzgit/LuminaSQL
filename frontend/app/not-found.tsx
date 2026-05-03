import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#f9f9ff] px-6">
      <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-card">
        <h1 className="text-3xl font-semibold text-slate-900">Page not found</h1>
        <p className="mt-4 text-sm text-slate-600">The page you are looking for does not exist.</p>
        <Link href="/dashboard" className="mt-8 inline-flex rounded-full bg-[#003d9b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#002e7d]">
          Go back to dashboard
        </Link>
      </div>
    </div>
  );
}
