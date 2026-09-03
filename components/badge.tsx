export function Badge({ children, tone = "yellow" }: { children: string; tone?: "yellow" | "cream" }) {
  return (
    <span className={`jumbos-badge ${tone}`}>
      <svg viewBox="0 0 20 20" aria-hidden="true" className="jumbos-badge-star"><path d="M10 0l2.35 6.9H20l-5.83 4.26L16.5 18 10 13.9 3.5 18l2.33-6.84L0 6.9h7.65z" /></svg>
      {children}
    </span>
  );
}
