import { downloadCSV } from "@/utils/downloadCSV";

interface ResultsTableProps {
  results: Record<string, unknown>[];
  totalMatches: number;
}

export default function ResultsTable({ results, totalMatches }: ResultsTableProps) {
  const headers = results.length > 0 ? Object.keys(results[0]) : [];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Results Preview</h2>
          <p className="mt-1 text-sm text-slate-500">See the top rows returned from your query.</p>
        </div>
        <div className="rounded-full bg-[#f0f3ff] px-3 py-1 text-sm font-semibold text-[#003d9b]">
          Showing {results.length} of {totalMatches} matches
        </div>
      </div>

      {results.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-[#f8faff] p-8 text-center text-sm text-slate-500">
          Run a query to see results here.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-[#dee9ff] text-left text-slate-800">
              <tr>
                {headers.map((header) => (
                  <th key={header} className="border-b border-[#c3c6d6] px-4 py-3 font-medium">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? "bg-[#f0f3ff] hover:bg-[#e7eeff]" : "hover:bg-[#e7eeff]"}
                >
                  {headers.map((header) => (
                    <td key={header} className="border-b border-slate-200 px-4 py-3 align-top text-slate-700">
                      {String(row[header] ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={() => downloadCSV(results)}
          className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#cbd5e1] hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={results.length === 0}
        >
          Download as CSV
        </button>
      </div>
    </div>
  );
}
