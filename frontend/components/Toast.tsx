"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type: "error" | "success";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "error" ? "bg-red-600" : "bg-green-600";
  const icon = type === "error" ? "❌" : "✓";

  return (
    <div className={`${bgColor} fixed bottom-4 right-4 left-4 md:left-auto md:w-96 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slideIn z-50`}>
      <span>{icon}</span>
      <span>{message}</span>
      <button
        type="button"
        onClick={onClose}
        className="ml-auto text-white hover:opacity-80"
      >
        ✕
      </button>
    </div>
  );
}
