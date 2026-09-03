"use client";

import { useSyncExternalStore, type ReactNode } from "react";

function canRender3D() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

const noopSubscribe = () => () => {};

/**
 * Gates a WebGL scene behind a client-only, reduced-motion-aware check.
 * Uses useSyncExternalStore (not useState+useEffect) so the server snapshot
 * and the client's first snapshot are both guaranteed `false` — no
 * WebGL-only render path, no hydration mismatch — and the canvas swaps in
 * only once React confirms it's safe to read browser APIs.
 */
export function SceneGate({ scene, fallback }: { scene: ReactNode; fallback: ReactNode }) {
  const ready = useSyncExternalStore(noopSubscribe, canRender3D, () => false);
  return ready ? <>{scene}</> : <>{fallback}</>;
}
