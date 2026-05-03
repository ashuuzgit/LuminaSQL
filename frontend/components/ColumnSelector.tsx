import React from "react";

interface ColumnSelectorProps {
  columns: string[];
  selectedColumns: string[];
  onChange: (selected: string[]) => void;
}

export default function ColumnSelector({ columns, selectedColumns, onChange }: ColumnSelectorProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(event.target.selectedOptions, (option) => option.value);
    onChange(options);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-[#f8fbff] p-4">
      <div className="mb-2 text-sm font-semibold text-slate-900">Select Columns (Optional)</div>
      <select
        className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#003d9b] focus:ring-2 focus:ring-[#003d9b] focus:ring-opacity-20"
        multiple
        size={Math.min(6, columns.length)}
        value={selectedColumns}
        onChange={handleChange}
      >
        {columns.map((column) => (
          <option key={column} value={column}>
            {column}
          </option>
        ))}
      </select>
    </div>
  );
}
