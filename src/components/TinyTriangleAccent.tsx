// src/components/TinyTriangleAccent.tsx
// Minimal three.js accent: animated red triangle for use as a bullet or section detail.

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import cx from "../utils/cx";

const ACCENT_RED = "#e23b2d";
const DEFAULT_BG = "#ffffff";

type TinyTriangleAccentProps = {
  className?: string;
};

const TinyTriangleAccent: React.FC<TinyTriangleAccentProps> = ({ className }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) {
      return undefined;
    }

  const width = 32;
  const height = 32;
  const canvasBg = window.getComputedStyle(mountNode).backgroundColor || DEFAULT_BG;

    // Scene
    const scene = new THREE.Scene();
  scene.background = new THREE.Color(canvasBg);

    // Camera
    const camera = new THREE.OrthographicCamera(0, width, height, 0, -10, 10);

    // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(canvasBg, 1);
    mountNode.appendChild(renderer.domElement);

    // Animated triangle points
    const baseY = 24;
    const triangle = [
      new THREE.Vector3(8, baseY, 0),
      new THREE.Vector3(24, baseY, 0),
      new THREE.Vector3(16, 8, 0),
      new THREE.Vector3(8, baseY, 0)
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(triangle);
    const material = new THREE.LineBasicMaterial({ color: ACCENT_RED, linewidth: 2 });
    const line = new THREE.Line(geometry, material);
    scene.add(line);

    // Pulse dot at triangle tip
    const dotGeo = new THREE.CircleGeometry(2.5, 16);
    const dotMat = new THREE.MeshBasicMaterial({ color: ACCENT_RED });
    const dot = new THREE.Mesh(dotGeo, dotMat);
    dot.position.set(16, 8, 0);
    scene.add(dot);

    // Animation loop
    let frameId: number;
    let time = 0;
    const animate = () => {
      time += 0.016;
      // Animate triangle tip up/down
      const tipY = 8 + Math.sin(time * 2.2) * 2.5;
      geometry.attributes.position.setY(2, tipY);
      geometry.attributes.position.needsUpdate = true;
      dot.position.y = tipY;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      mountNode.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className={cx("tiny-triangle-accent", className)}>
      <div ref={mountRef} className="tiny-triangle-accent__canvas" />
    </div>
  );
};

export default TinyTriangleAccent;
