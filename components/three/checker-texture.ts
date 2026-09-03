import * as THREE from "three";

let cached: THREE.Texture | null = null;

/** Procedural red/cream checker-paper texture, generated once and cached. */
export function getCheckerTexture() {
  if (cached) return cached;
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#f2ead4";
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = "#c43d35";
  const cell = size / 4;
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if ((x + y) % 2 === 0) ctx.fillRect(x * cell, y * cell, cell, cell);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  texture.colorSpace = THREE.SRGBColorSpace;
  cached = texture;
  return texture;
}
