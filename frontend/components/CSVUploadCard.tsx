"use client";

import React, { useEffect, useRef, useState } from "react";
import ColumnSelector from "@/components/ColumnSelector";
import ProgressBar from "@/components/ProgressBar";

interface CSVUploadCardProps {
  uploading: boolean;
  uploadProgress: number;
  fileName: string;
  rowCount: number;
  columns: string[];
  onFileSelect: (file: File) => void;
}

export default function CSVUploadCard({
  uploading,
  uploadProgress,
  fileName,
  rowCount,
  columns,
  onFileSelect,
}: CSVUploadCardProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  useEffect(() => {
    setSelectedColumns(columns);
  }, [columns]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-700 bg-slate-950 p-6 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-100">CSV Upload</p>
          <p className="mt-1 text-sm text-slate-400">Upload a file to analyze with LuminaSQL.</p>
        </div>
        <div className="rounded-2xl bg-slate-800 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100">
          {fileName ? "Uploaded" : "Ready"}
        </div>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`mt-6 flex h-52 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed px-5 text-center transition ${
          dragOver ? "border-[#3d6bc9] bg-slate-900" : "border-slate-700 bg-slate-950"
        }`}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-800 text-2xl text-slate-100">
          ⬆️
        </div>
        <p className="mt-4 text-sm font-semibold text-slate-100">Drag and drop file here</p>
        <p className="mt-2 text-sm text-slate-400">or click to browse</p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between rounded-2xl bg-slate-900 px-4 py-3 text-sm text-slate-200">
          <span>{fileName || "No file selected"}</span>
          <span>{rowCount ? `${rowCount} rows` : "No rows yet"}</span>
        </div>

        <ProgressBar value={uploadProgress} animated={uploading} />

        {columns.length > 0 ? (
          <ColumnSelector
            columns={columns}
            selectedColumns={selectedColumns}
            onChange={setSelectedColumns}
          />
        ) : null}
      </div>
    </div>
  );
}
