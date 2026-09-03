"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { getCheckerTexture } from "./checker-texture";
import { PhotoPlane } from "./photo-plane";

const MAX_TILT = 0.06; // radians, ~3.4deg — "no exaggerated spinning"

/** Lives inside the Canvas so it can call invalidate() (frameloop="demand") on pointer move, and lerps the rig toward the target each frame until settled. */
function PointerRig({ containerRef, children }: { containerRef: React.RefObject<HTMLElement | null>; children: React.ReactNode }) {
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
    const targetX = -target.current.y * MAX_TILT * 0.6;
    g.rotation.y += (targetY - g.rotation.y) * 0.08;
    g.rotation.x += (targetX - g.rotation.x) * 0.08;
    if (Math.abs(g.rotation.y - targetY) > 0.0005 || Math.abs(g.rotation.x - targetX) > 0.0005) invalidate();
  });

  return <group ref={group}>{children}</group>;
}

function TrayLayer({ radius }: { radius: number }) {
  return (
    <group position={[radius * 0.15, -radius * 0.55, -0.9]} rotation={[-0.55, 0, -0.06]}>
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
    <mesh position={[-width * 0.12, -height * 0.05, -0.45]} rotation={[0, 0, -0.09]}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial map={texture} roughness={0.9} />
    </mesh>
  );
}

function HeroContent({ viewport, containerRef }: { viewport: { width: number; height: number }; containerRef: React.RefObject<HTMLElement | null> }) {
  const frame = Math.min(viewport.width * 0.85, 5.2);
  const frameH = Math.min(viewport.height * 0.8, 4);
  return (
    <group>
      <ambientLight intensity={0.9} />
      <directionalLight position={[2, 3, 4]} intensity={1.1} />
      <directionalLight position={[-3, -1, 2]} intensity={0.35} />
      <PointerRig containerRef={containerRef}>
        <TrayLayer radius={frame * 0.38} />
        <CheckerLayer width={frame * 0.62} height={frameH * 0.56} />
        <Suspense fallback={null}>
          <PhotoPlane
            src="/brand/food-hero.png"
            width={frame * 0.7}
            height={frameH * 0.92}
            position={[frame * 0.02, frameH * 0.02, 0]}
            rotation={[0, 0, 0.03]}
          />
        </Suspense>
      </PointerRig>
    </group>
  );
}

function SceneInner({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const { viewport } = useThree();
  return <HeroContent viewport={viewport} containerRef={containerRef} />;
}

export function HeroScene({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const [dpr] = useState(() => Math.min(window.devicePixelRatio || 1, window.innerWidth < 760 ? 1.5 : 2));

  return (
    <Canvas
      className="hero-canvas"
      frameloop="demand"
      dpr={dpr}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 6], fov: 32 }}
    >
      <SceneInner containerRef={containerRef} />
    </Canvas>
  );
}
