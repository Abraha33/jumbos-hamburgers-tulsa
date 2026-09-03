export function CheckerDivider({ className }: { className?: string }) {
  return <div className={`checker-divider ${className ?? ""}`} aria-hidden="true" />;
}
