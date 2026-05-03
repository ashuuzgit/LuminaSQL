"use client";

import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import NLQInput from "@/components/NLQInput";
import CSVUploadCard from "@/components/CSVUploadCard";
import CodeBlock from "@/components/CodeBlock";
import ResultsTable from "@/components/ResultsTable";
import { useDataFlow } from "@/hooks/useDataFlow";

export default function DashboardPage() {
  const {
    columns,
    sampleRows,
    rowCount,
    uploading,
    uploadProgress,
    fileName,
    question,
    setQuestion,
    sql,
    results,
    totalMatches,
    loading,
    error,
    activeNav,
    setActiveNav,
    handleUpload,
    handleQuery,
  } = useDataFlow();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeNav={activeNav} onNavigate={setActiveNav} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar title="LuminaSQL" />

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <NLQInput
            value={question}
            onChange={setQuestion}
            onSubmit={handleQuery}
            loading={loading}
            disabled={columns.length === 0}
          />

          <div className="grid grid-cols-[420px_1fr] gap-4 items-start">
            <CSVUploadCard
              uploading={uploading}
              uploadProgress={uploadProgress}
              fileName={fileName}
              rowCount={rowCount}
              columns={columns}
              onFileSelect={handleUpload}
            />

            <div className="flex flex-col gap-4">
              <CodeBlock sql={sql} />
              <ResultsTable results={results} totalMatches={totalMatches} />
            </div>
          </div>

          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
