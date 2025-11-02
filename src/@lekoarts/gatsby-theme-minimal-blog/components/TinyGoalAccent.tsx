// src/@lekoarts/gatsby-theme-minimal-blog/components/TinyGoalAccent.tsx
// Minimal three.js accent: animated flag for career goal item.

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ACCENT_GREEN = "#2ecc40";
const BG_COLOR = "#fff";

const TinyGoalAccent: React.FC = () => {
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

    // Flag pole
    const poleGeo = new THREE.BoxGeometry(2, 18, 1);
    const poleMat = new THREE.MeshBasicMaterial({ color: "#888" });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.set(8, 16, 0);
    scene.add(pole);

    // Flag
    const flagGeo = new THREE.BoxGeometry(12, 8, 1);
    const flagMat = new THREE.MeshBasicMaterial({ color: ACCENT_GREEN });
    const flag = new THREE.Mesh(flagGeo, flagMat);
    flag.position.set(16, 12, 0);
    scene.add(flag);

    // Animation loop
    let frameId: number;
    let time = 0;
    const animate = () => {
      time += 0.016;
      flag.position.y = 12 + Math.sin(time * 1.7) * 2.2;
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

export default TinyGoalAccent;
