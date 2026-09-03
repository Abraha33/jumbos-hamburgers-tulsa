"use client";

import { useLoader, type ThreeElements } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

type Props = {
  src: string;
  width: number;
  height: number;
  opacity?: number;
  /** Zoom into a sub-rectangle of the source image, [u0, v0, u1, v1] in top-down normalized image space (0..1). Use this to crop out unwanted chrome (e.g. a screenshot's UI overlay) instead of showing the full source photo. */
  crop?: [number, number, number, number];
} & Omit<ThreeElements["group"], "ref">;

/** A plane textured with a photo, sized to fit `width` x `height` world units without distorting the image (contain-fit). */
export function PhotoPlane({ src, width, height, opacity = 1, crop, ...groupProps }: Props) {
  const texture = useLoader(THREE.TextureLoader, src);
  useEffect(() => {
    // three.js textures are configured via property mutation by design (not React state) —
    // this is the standard way to set color space on a loaded Three.js Texture.
    // eslint-disable-next-line react-hooks/immutability
    texture.colorSpace = THREE.SRGBColorSpace;
    if (crop) {
      const [u0, v0, u1, v1] = crop;
      texture.offset.set(u0, 1 - v1);
      texture.repeat.set(u1 - u0, v1 - v0);
    }
  }, [texture, crop]);

  const [w, h] = useMemo(() => {
    const cropAspect = crop ? (crop[2] - crop[0]) / (crop[3] - crop[1]) : 1;
    const imgAspect = (texture.image.width / texture.image.height) * cropAspect;
    const boxAspect = width / height;
    return imgAspect > boxAspect ? [width, width / imgAspect] : [height * imgAspect, height];
  }, [texture, width, height, crop]);

  return (
    <group {...groupProps}>
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial map={texture} roughness={0.85} metalness={0} toneMapped={false} transparent={opacity < 1} opacity={opacity} />
      </mesh>
    </group>
  );
}
