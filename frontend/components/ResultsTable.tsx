import { downloadCSV } from "@/utils/downloadCSV";

interface ResultsTableProps {
  results: Record<string, unknown>[];
  totalMatches: number;
}

export default function ResultsTable({ results, totalMatches }: ResultsTableProps) {
  const headers = results.length > 0 ? Object.keys(results[0]) : [];

  return (
    <div className="rounded-3xl border border-slate-700 bg-slate-950 p-4 md:p-6 shadow-card">
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-100">Results Preview</h2>
          <p className="mt-1 text-sm text-slate-400">See the top rows returned from your query.</p>
        </div>
        <div className="rounded-full bg-slate-800 px-3 py-1 text-sm font-semibold text-slate-100 whitespace-nowrap">
          Showing {results.length} of {totalMatches} matches
        </div>
      </div>

      {results.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950 p-8 text-center text-sm text-slate-400">
          Run a query to see results here.
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-3xl border border-slate-700 bg-slate-950">
            <table className="min-w-full border-collapse text-sm">
              <thead className="bg-slate-800 text-left text-slate-100">
                <tr>
                  {headers.map((header) => (
                    <th key={header} className="border-b border-slate-700 px-4 py-3 font-medium text-slate-300">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? "bg-slate-950/80 hover:bg-slate-900" : "hover:bg-slate-900"}
                  >
                    {headers.map((header) => (
                      <td key={header} className="border-b border-slate-700 px-4 py-3 align-top text-slate-300">
                        {String(row[header] ?? "")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {results.slice(0, 5).map((row, rowIndex) => (
              <div key={rowIndex} className="rounded-2xl border border-slate-700 bg-slate-900/50 p-4 space-y-2">
                {headers.map((header) => (
                  <div key={header} className="flex justify-between items-start gap-2">
                    <span className="text-xs font-semibold text-slate-400">{header}</span>
                    <span className="text-sm text-slate-300 text-right">{String(row[header] ?? "")}</span>
                  </div>
                ))}
              </div>
            ))}
            {results.length > 5 && (
              <p className="text-center text-sm text-slate-400 mt-4">
                Showing 5 of {results.length} results on mobile. Download CSV to see all.
              </p>
            )}
          </div>
        </>
      )}

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={() => downloadCSV(results)}
          className="btn-primary bg-[#003d9b] text-white transition hover:bg-[#002e7d] disabled:cursor-not-allowed disabled:opacity-50 text-sm md:text-base"
          disabled={results.length === 0}
        >
          ⬇️ Download CSV
        </button>
      </div>
    </div>
  );
}
