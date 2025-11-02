// src/@lekoarts/gatsby-theme-minimal-blog/components/TinyNodeAccent.tsx
// Minimal three.js accent: animated node for recent item.

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ACCENT_BLUE = "#3da6ff";
const BG_COLOR = "#fff";

const TinyNodeAccent: React.FC = () => {
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

    // Node: central dot + 3 orbiting dots
    const centerGeo = new THREE.CircleGeometry(4, 16);
    const centerMat = new THREE.MeshBasicMaterial({ color: ACCENT_BLUE });
    const center = new THREE.Mesh(centerGeo, centerMat);
    center.position.set(16, 16, 0);
    scene.add(center);

    const orbitDots: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const geo = new THREE.CircleGeometry(2, 12);
      const mat = new THREE.MeshBasicMaterial({ color: "#bbb" });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      orbitDots.push(mesh);
    }

    // Animation loop
    let frameId: number;
    let time = 0;
    const animate = () => {
      time += 0.016;
      for (let i = 0; i < orbitDots.length; i++) {
        const angle = time * 1.2 + i * 2.1;
        orbitDots[i].position.x = 16 + Math.cos(angle) * 10;
        orbitDots[i].position.y = 16 + Math.sin(angle) * 10;
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
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        verticalAlign: "middle",
        background: "#f7f7f7",
        borderRadius: "6px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        border: "1px solid #ececec",
        overflow: "hidden",
        marginRight: "0.5rem"
      }}
    >
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default TinyNodeAccent;
