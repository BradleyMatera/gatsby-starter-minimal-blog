// src/@lekoarts/gatsby-theme-minimal-blog/components/TinyGearAccent.tsx
// Minimal three.js accent: animated gear for technical focus.

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ACCENT_GRAY = "#888";
const BG_COLOR = "#fff";

const TinyGearAccent: React.FC = () => {
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

    // Gear: circle + teeth
    const gearGeo = new THREE.CircleGeometry(10, 24);
    const gearMat = new THREE.MeshBasicMaterial({ color: ACCENT_GRAY });
    const gear = new THREE.Mesh(gearGeo, gearMat);
    gear.position.set(16, 16, 0);
    scene.add(gear);

    // Teeth
    const teeth: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const angle = (2 * Math.PI * i) / 8;
      const x = 16 + Math.cos(angle) * 12;
      const y = 16 + Math.sin(angle) * 12;
      const toothGeo = new THREE.BoxGeometry(2, 6, 1);
      const toothMat = new THREE.MeshBasicMaterial({ color: "#bbb" });
      const tooth = new THREE.Mesh(toothGeo, toothMat);
      tooth.position.set(x, y, 0);
      tooth.rotation.z = angle;
      scene.add(tooth);
      teeth.push(tooth);
    }

    // Animation loop
    let frameId: number;
    let time = 0;
    const animate = () => {
      time += 0.016;
      gear.rotation.z = time * 0.7;
      for (let i = 0; i < teeth.length; i++) {
        teeth[i].rotation.z = time * 0.7;
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

export default TinyGearAccent;
