// src/@lekoarts/gatsby-theme-minimal-blog/components/TinyMedalAccent.tsx
// Minimal three.js accent: animated medal for background item.

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ACCENT_GOLD = "#ffd700";
const BG_COLOR = "#fff";

const TinyMedalAccent: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) {
      return;
    }

    const mountNode = mountRef.current;
    let frameId: number;
    let renderer: THREE.WebGLRenderer;

    try {
      const width = 32;
      const height = 32;

      if (mountNode.clientWidth === 0 || mountNode.clientHeight === 0) {
        console.warn("TinyMedalAccent: mount node has zero dimensions.");
        return;
      }

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(BG_COLOR);

      const camera = new THREE.OrthographicCamera(0, width, height, 0, -10, 10);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      mountNode.appendChild(renderer.domElement);

      const medalGeo = new THREE.CircleGeometry(10, 24);
      const medalMat = new THREE.MeshBasicMaterial({ color: ACCENT_GOLD });
      const medal = new THREE.Mesh(medalGeo, medalMat);
      medal.position.set(16, 16, 0);
      scene.add(medal);

      const ribbonGeo = new THREE.BoxGeometry(4, 10, 1);
      const ribbonMat = new THREE.MeshBasicMaterial({ color: "#e23b2d" });
      const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
      ribbon.position.set(16, 26, 0);
      scene.add(ribbon);

      let time = 0;
      const animate = () => {
        time += 0.016;
        medal.position.y = 16 + Math.sin(time * 1.2) * 1.2;
        ribbon.position.y = 26 + Math.cos(time * 1.4) * 1.1;
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };
      animate();

    } catch (error) {
      console.error("Error initializing TinyMedalAccent scene:", error);
    }

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      if (renderer) {
        if (renderer.domElement.parentNode === mountNode) {
          mountNode.removeChild(renderer.domElement);
        }
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
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default TinyMedalAccent;
