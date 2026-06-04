interface CodeBlockProps {
  sql: string;
}

export default function CodeBlock({ sql }: CodeBlockProps) {
  return (
    <div className="rounded-3xl bg-[#0b1326] p-4 md:p-5 text-sm text-[#adc6ff] shadow-card">
      <div className="mb-4 flex items-center justify-between border-b border-[#16203f] pb-3 text-[11px] uppercase tracking-[0.3em] text-[#adc6ff]">
        <span>Generated Query Logic</span>
      </div>
      <pre className="whitespace-pre-wrap break-words roboto-mono-400 text-xs md:text-sm leading-5 md:leading-6 overflow-x-auto">
        {sql || "Your SQL will appear here after running a query."}
      </pre>
    </div>
  );
}
