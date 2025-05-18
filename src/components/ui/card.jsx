export function Card({ children, className = '' }) {
  return (
    <div className={`rounded-xl border bg-[#1C1F26] text-white shadow-md ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}