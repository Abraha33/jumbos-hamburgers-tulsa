"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { getCheckerTexture } from "./checker-texture";
import { PhotoPlane } from "./photo-plane";

const MAX_TILT = 0.05;

/** menu-meals.webp is a wide board photo with a Google Photos overlay baked in — zoom into just the food circle. Clean product photos (fries, mushrooms) need no crop. */
const CROPS: Record<string, [number, number, number, number] | undefined> = {
  "/photos/menu-meals.webp": [0.39, 0.31, 0.70, 0.78],
  "/brand/food-featured.png": [0, 0.10, 1, 0.95],
};

function PointerTilt({ containerRef, children }: { containerRef: React.RefObject<HTMLElement | null>; children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });
  const { invalidate } = useThree();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const bounds = container.getBoundingClientRect();
      target.current.x = (event.clientX - bounds.left) / bounds.width - 0.5;
      target.current.y = (event.clientY - bounds.top) / bounds.height - 0.5;
      invalidate();
    };
    const onLeave = () => { target.current.x = 0; target.current.y = 0; invalidate(); };
    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerleave", onLeave);
    return () => {
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
    };
  }, [containerRef, invalidate]);

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const targetY = target.current.x * MAX_TILT;
    const targetX = -target.current.y * MAX_TILT * 0.5;
    g.rotation.y += (targetY - g.rotation.y) * 0.1;
    g.rotation.x += (targetX - g.rotation.x) * 0.1;
    if (Math.abs(g.rotation.y - targetY) > 0.0005 || Math.abs(g.rotation.x - targetX) > 0.0005) invalidate();
  });

  return <group ref={group}>{children}</group>;
}

/**
 * Crossfades the photo plane's opacity/scale in on mount, instead of a hard cut.
 * The parent keys this component by `src`, so a fresh mount (opacity starting at 0)
 * is exactly what happens whenever the selected meal changes — no reset effect needed.
 */
function FoodPhoto({ src, width, height }: { src: string; width: number; height: number }) {
  const { invalidate } = useThree();
  const [opacity, setOpacity] = useState(0);

  useEffect(() => { invalidate(); }, [invalidate]);

  useFrame(() => {
    if (opacity < 1) {
      setOpacity((o) => Math.min(1, o + 0.06));
      invalidate();
    }
  });

  return (
    <group position={[0, 0, 0.4]} scale={0.94 + opacity * 0.06}>
      <Suspense fallback={null}>
        <PhotoPlane src={src} width={width} height={height} opacity={opacity} crop={CROPS[src]} />
      </Suspense>
    </group>
  );
}

function TrayLayer({ radius }: { radius: number }) {
  return (
    <group position={[-radius * 0.1, -radius * 0.5, -1]} rotation={[-0.5, 0, 0.05]}>
      <mesh>
        <circleGeometry args={[radius, 48]} />
        <meshStandardMaterial color="#1c4a78" roughness={0.55} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <ringGeometry args={[radius * 0.92, radius, 48]} />
        <meshStandardMaterial color="#0f2948" roughness={0.6} />
      </mesh>
    </group>
  );
}

function CheckerLayer({ width, height }: { width: number; height: number }) {
  const texture = getCheckerTexture();
  return (
    <mesh position={[width * 0.1, -height * 0.04, -0.5]} rotation={[0, 0, 0.075]}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial map={texture} roughness={0.9} />
    </mesh>
  );
}

function SceneInner({ containerRef, photoSrc }: { containerRef: React.RefObject<HTMLElement | null>; photoSrc: string }) {
  const { viewport } = useThree();
  const frame = Math.min(viewport.width * 0.8, 4.4);
  const frameH = Math.min(viewport.height * 0.75, 3.4);
  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[2, 3, 4]} intensity={1.05} />
      <directionalLight position={[-2, -1, 2]} intensity={0.3} />
      <PointerTilt containerRef={containerRef}>
        <TrayLayer radius={frame * 0.36} />
        <CheckerLayer width={frame * 0.6} height={frameH * 0.55} />
        <FoodPhoto key={photoSrc} src={photoSrc} width={frame * 0.5} height={frameH * 0.58} />
      </PointerTilt>
    </>
  );
}

export function FeaturedScene({ containerRef, photoSrc }: { containerRef: React.RefObject<HTMLElement | null>; photoSrc: string }) {
  const [dpr] = useState(() => Math.min(window.devicePixelRatio || 1, window.innerWidth < 760 ? 1.5 : 2));
  return (
    <Canvas className="featured-canvas" frameloop="demand" dpr={dpr} gl={{ alpha: true, antialias: true, powerPreference: "low-power" }} camera={{ position: [0, 0, 5.5], fov: 30 }}>
      <SceneInner containerRef={containerRef} photoSrc={photoSrc} />
    </Canvas>
  );
}
