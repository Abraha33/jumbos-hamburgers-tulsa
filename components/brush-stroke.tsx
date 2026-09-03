"use client";

import { useEffect, useRef, useState } from "react";

export function BrushUnderline({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [painted, setPainted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setPainted(true); observer.disconnect(); }
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <span ref={ref} className={`brush-underline ${painted ? "is-painted" : ""} ${className ?? ""}`} aria-hidden="true" />;
}
