"use client";

import { useState } from "react";
import axios from "axios";

interface UseDataFlowReturn {
  columns: string[];
  sampleRows: Record<string, unknown>[];
  rowCount: number;
  uploading: boolean;
  uploadProgress: number;
  uploadSuccess: boolean;
  fileName: string;
  question: string;
  setQuestion: (value: string) => void;
  sql: string;
  results: Record<string, unknown>[];
  totalMatches: number;
  loading: boolean;
  error: string;
  activeNav: string;
  setActiveNav: (value: string) => void;
  handleUpload: (file: File) => Promise<void>;
  handleQuery: () => Promise<void>;
}

export function useDataFlow(): UseDataFlowReturn {
  const [columns, setColumns] = useState<string[]>([]);
  const [sampleRows, setSampleRows] = useState<Record<string, unknown>[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [fileName, setFileName] = useState("");
  const [question, setQuestion] = useState("");
  const [sql, setSql] = useState("");
  const [results, setResults] = useState<Record<string, unknown>[]>([]);
  const [totalMatches, setTotalMatches] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeNav, setActiveNav] = useState("Uploads");

  const handleUpload = async (file: File) => {
    setUploading(true);
    setFileName(file.name);
    setUploadProgress(0);
    setError("");
    setUploadSuccess(false);

    const interval = window.setInterval(() => {
      setUploadProgress((p) => Math.min(p + 10, 90));
    }, 200);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.post("/api/proxy/upload", formData);
      setColumns(data.columns || []);
      setSampleRows(data.preview || []);
      setRowCount(data.rowCount || 0);
      setUploadProgress(100);
      setUploadSuccess(true);
      
      // Reset highlight after 3 seconds
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setError("Upload failed");
      setUploadProgress(0);
      setColumns([]);
      setSampleRows([]);
      setRowCount(0);
      setUploadSuccess(false);
    } finally {
      window.clearInterval(interval);
      setUploading(false);
    }
  };

  const handleQuery = async () => {
    if (!question.trim()) {
      setError("Please enter a question");
      return;
    }
    if (!columns.length) {
      setError("Please upload a CSV file first");
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post("/api/proxy/query", {
        question,
        columns,
        sampleRows,
      });
      setSql(data.sql || "");
      setResults(data.results || []);
      setTotalMatches(data.results?.length ?? 0);
    } catch (err: any) {
      console.error(err);
      
      // Check if it's a validation error (invalid query)
      const errorMessage = err.response?.data?.message || err.message || "";
      if (
        errorMessage.toLowerCase().includes("invalid") ||
        errorMessage.toLowerCase().includes("syntax") ||
        errorMessage.toLowerCase().includes("cannot parse") ||
        err.response?.status === 400
      ) {
        setError("Invalid query - Please rephrase your question");
      } else {
        setError("Query failed - Please try again");
      }
      
      setSql("");
      setResults([]);
      setTotalMatches(0);
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
}
