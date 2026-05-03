export const downloadCSV = (results: object[], filename = "results.csv") => {
  if (!results.length) return;

  const headers = Object.keys(results[0]).join(",");
  const rows = results.map((row) =>
    Object.values(row)
      .map((value) => `"${String(value).replace(/"/g, '""')}"`)
      .join(",")
  );

  const blob = new Blob([[headers, ...rows].join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};
