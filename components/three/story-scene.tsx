"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import { PhotoPlane } from "./photo-plane";

const SLIDES = [
  { src: "/photos/storefront.jpg", tilt: -0.08 },
  { src: "/decor/heritage-board-blank.webp", tilt: 0.05 },
  { src: "/photos/menu-burgers.webp", tilt: -0.05 },
  { src: "/photos/menu-mediterranean.webp", tilt: 0.07 },
] as const;

function Slide({ index, progress, width, height }: { index: number; progress: number; width: number; height: number }) {
  const distance = progress - index;
  const active = Math.max(0, 1 - Math.min(1, Math.abs(distance)));
  const z = -Math.abs(distance) * 1.4;
  const x = distance * width * 0.55;
  const rotY = THREE.MathUtils.clamp(-distance * 0.35, -0.6, 0.6);
  const scale = 0.82 + active * 0.18;

  return (
    <group position={[x, 0, z]} rotation={[0, rotY, SLIDES[index].tilt * active]} scale={scale}>
      <Suspense fallback={null}>
        <PhotoPlane src={SLIDES[index].src} width={width * 0.86} height={height * 0.86} opacity={0.15 + active * 0.85} />
      </Suspense>
    </group>
  );
}

/** Re-renders the (frameloop="demand") canvas whenever the scroll-driven progress value changes. */
function Invalidator({ progress }: { progress: number }) {
  const { invalidate } = useThree();
  useEffect(() => { invalidate(); }, [progress, invalidate]);
  return null;
}

function SceneInner({ progress }: { progress: number }) {
  const { viewport } = useThree();
  const w = Math.min(viewport.width * 0.62, 6);
  const h = Math.min(viewport.height * 0.72, 5.5);
  return (
    <>
      <Invalidator progress={progress} />
      <ambientLight intensity={0.95} />
      <directionalLight position={[3, 4, 5]} intensity={1} />
      <directionalLight position={[-3, -2, 2]} intensity={0.3} />
      {SLIDES.map((_, index) => <Slide key={index} index={index} progress={progress} width={w} height={h} />)}
    </>
  );
}

export function StoryScene({ progress }: { progress: number }) {
  const [dpr] = useState(() => Math.min(window.devicePixelRatio || 1, window.innerWidth < 760 ? 1.4 : 2));
  return (
    <Canvas className="story-canvas" frameloop="demand" dpr={dpr} gl={{ alpha: true, antialias: true, powerPreference: "low-power" }} camera={{ position: [0, 0, 6], fov: 34 }}>
      <SceneInner progress={progress} />
    </Canvas>
  );
}
