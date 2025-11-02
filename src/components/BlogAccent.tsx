// src/components/BlogAccent.tsx
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const BlogAccent: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const width = mountRef.current?.clientWidth || 600;
    const height = 48;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#fff");

    // Camera
    const camera = new THREE.OrthographicCamera(0, width, height, 0, -10, 10);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current?.appendChild(renderer.domElement);

    // Animated accent line
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 40; i++) {
      const x = (width / 40) * i;
      const y = height / 2 + Math.sin(i * 0.3) * 8;
      points.push(new THREE.Vector3(x, y, 0));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: "#e23b2d", linewidth: 2 });
    const line = new THREE.Line(geometry, material);
    scene.add(line);

    // Animation
    let frameId: number;
    const animate = () => {
      for (let i = 0; i <= 40; i++) {
        const y = height / 2 + Math.sin(i * 0.3 + Date.now() * 0.002) * 8;
        geometry.attributes.position.setY(i, y);
      }
      geometry.attributes.position.needsUpdate = true;
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
      ref={mountRef}
      style={{
        width: "100%",
        height: "48px",
        marginBottom: "0.5rem",
        background: "#fff",
        overflow: "hidden",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(226,59,45,0.08)",
      }}
    />
  );
};

export default BlogAccent;
