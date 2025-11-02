// src/components/TinyDotClusterAccent.tsx
// Minimal three.js accent: animated dot cluster for card corners.

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ACCENT_RED = "#e23b2d";
const BG_COLOR = "#fff";

const TinyDotClusterAccent: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const width = 32;
    const height = 32;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(BG_COLOR);

    // Camera
    const camera = new THREE.OrthographicCamera(0, width, height, 0, -10, 10);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current?.appendChild(renderer.domElement);

    // Dot cluster
    const dots: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const geo = new THREE.CircleGeometry(2.2, 12);
      const mat = new THREE.MeshBasicMaterial({ color: i === 0 ? ACCENT_RED : "#bbb" });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(8 + i * 4.5, 16 + Math.sin(i) * 3, 0);
      scene.add(mesh);
      dots.push(mesh);
    }

    // Animation loop
    let frameId: number;
    let time = 0;
    const animate = () => {
      time += 0.016;
      // Animate dots in a wave
      for (let i = 0; i < dots.length; i++) {
        dots[i].position.y = 16 + Math.sin(time * 1.8 + i * 0.7) * 2.2;
      }
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      style={{
        width: "32px",
        height: "32px",
        display: "inline-block",
        verticalAlign: "middle",
        background: BG_COLOR,
        borderRadius: "6px",
        overflow: "hidden",
        position: "absolute",
        top: "6px",
        left: "6px",
        zIndex: 2
      }}
    >
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default TinyDotClusterAccent;
