"use client";

import { useState, useRef, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import NLQInput from "@/components/NLQInput";
import CSVUploadCard from "@/components/CSVUploadCard";
import CodeBlock from "@/components/CodeBlock";
import ResultsTable from "@/components/ResultsTable";
import Toast from "@/components/Toast";
import { useDataFlow } from "@/hooks/useDataFlow";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"error" | "success">("error");
  const [isQueryInputFocused, setIsQueryInputFocused] = useState(false);
  const [showResultsView, setShowResultsView] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    columns,
    sampleRows,
    rowCount,
    uploading,
    uploadProgress,
    uploadSuccess,
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

  // Show toast when error occurs
  useEffect(() => {
    if (error) {
      setToastMessage(error);
      setToastType("error");
      setShowToast(true);
      setShowResultsView(false);
    }
  }, [error]);

  // Scroll to results on mobile after successful query
  useEffect(() => {
    if (results.length > 0 && !loading) {
      const isMobile = window.innerWidth < 768;
      setShowResultsView(isMobile);
      if (isMobile && resultsRef.current) {
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    }
  }, [results, loading]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        activeNav={activeNav}
        onNavigate={setActiveNav}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-col flex-1 overflow-hidden w-full">
        <TopBar
          title="LuminaSQL"
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          showHamburger={true}
        />

        <div className="flex-1 overflow-y-auto flex flex-col">
          {/* Query Input - Hide on mobile when showing results */}
          <div
            className={`flex-shrink-0 p-3 md:p-6 transition-all duration-300 md:block ${
              showResultsView ? "hidden" : "block"
            } ${
              isQueryInputFocused ? "md:p-6 p-4 md:scale-100 scale-105 md:translate-y-0 translate-y-12" : ""
            }`}
          >
            <NLQInput
              value={question}
              onChange={setQuestion}
              onSubmit={handleQuery}
              loading={loading}
              disabled={columns.length === 0}
              highlight={uploadSuccess}
              onFocusChange={setIsQueryInputFocused}
            />
          </div>

          {/* Content - Gets blurred and reduced opacity on mobile when input focused */}
          <div
            ref={contentRef}
            className={`flex-1 overflow-y-auto p-3 md:p-6 space-y-4 transition-all duration-300 ${
              isQueryInputFocused ? "md:blur-0 blur-sm md:opacity-100 opacity-40" : "blur-0 opacity-100"
            }`}
          >
            {/* Back button on mobile when showing results */}
            {showResultsView && (
              <button
                type="button"
                onClick={() => setShowResultsView(false)}
                className="md:hidden mb-4 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 transition text-sm"
              >
                ← Back to Query
              </button>
            )}

            {/* Show CSV upload on mobile only when not viewing results */}
            {!showResultsView && (
              <div className="md:hidden">
                <CSVUploadCard
                  uploading={uploading}
                  uploadProgress={uploadProgress}
                  fileName={fileName}
                  rowCount={rowCount}
                  columns={columns}
                  onFileSelect={handleUpload}
                />
              </div>
            )}

            {/* Desktop layout - always show CSV upload and results side by side */}
            <div className="hidden md:grid grid-cols-[420px_1fr] gap-4 items-start">
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

            {/* Mobile results view - show when user has executed a query */}
            {showResultsView && (
              <div className="flex flex-col gap-4 md:hidden" ref={resultsRef}>
                <CodeBlock sql={sql} />
                <ResultsTable results={results} totalMatches={totalMatches} />
              </div>
            )}
          </div>
        </div>
      </div>

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

