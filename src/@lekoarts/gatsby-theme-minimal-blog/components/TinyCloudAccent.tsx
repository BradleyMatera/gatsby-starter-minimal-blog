// src/@lekoarts/gatsby-theme-minimal-blog/components/TinyCloudAccent.tsx
// Minimal three.js accent: animated cloud for overview section.

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ACCENT_BLUE = "#3da6ff";
const BG_COLOR = "#fff";

const TinyCloudAccent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    let frameId: number;
    let renderer: THREE.WebGLRenderer;

    try {
      const width = 48;
      const height = 32;

      if (canvas.clientWidth === 0 || canvas.clientHeight === 0) {
        console.warn("TinyCloudAccent: canvas has zero dimensions.");
        return;
      }

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(BG_COLOR);

      const camera = new THREE.OrthographicCamera(0, width, height, 0, -10, 10);

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);

      const circles: THREE.Mesh[] = [];
      const positions = [
        { x: 16, y: 16, r: 10 },
        { x: 28, y: 14, r: 8 },
        { x: 22, y: 22, r: 7 }
      ];
      for (let i = 0; i < positions.length; i++) {
        const geo = new THREE.CircleGeometry(positions[i].r, 24);
        const mat = new THREE.MeshBasicMaterial({ color: ACCENT_BLUE });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(positions[i].x, positions[i].y, 0);
        scene.add(mesh);
        circles.push(mesh);
      }

      let time = 0;
      const animate = () => {
        time += 0.016;
        circles[0].position.y = 16 + Math.sin(time * 1.2) * 1.2;
        circles[1].position.y = 14 + Math.cos(time * 1.4) * 1.1;
        circles[2].position.y = 22 + Math.sin(time * 1.7) * 1.4;
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };
      animate();

    } catch (error) {
      console.error("Error initializing TinyCloudAccent scene:", error);
    }

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      if (renderer) {
        renderer.dispose();
      }
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
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default TinyCloudAccent;
