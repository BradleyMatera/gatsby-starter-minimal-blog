// src/components/ThreeHeroPlain.tsx
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

function generateNodes(count: number, radius: number): [number, number, number][] {
  const nodes: [number, number, number][] = [];
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(-1 + (2 * i) / count);
    const theta = Math.sqrt(count * Math.PI) * phi;
    nodes.push([
      radius * Math.cos(theta) * Math.sin(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(phi),
    ]);
  }
  return nodes;
}

const ThreeHeroPlain: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const width = mountRef.current?.clientWidth || 800;
    const height = mountRef.current?.clientHeight || 400;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#fff");

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 3.5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current?.appendChild(renderer.domElement);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);
    const dir1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dir1.position.set(2, 2, 5);
    scene.add(dir1);
    const dir2 = new THREE.DirectionalLight(0xffffff, 0.6);
    dir2.position.set(-2, -2, -3);
    scene.add(dir2);

    // Nodes
    const nodeCount = 36;
    const radius = 1.35;
    const accent = "#e23b2d";
    const nodes = generateNodes(nodeCount, radius);

    const nodeMeshes: THREE.Mesh[] = [];
    nodes.forEach((pos) => {
      const geometry = new THREE.SphereGeometry(0.06, 16, 16);
      const material = new THREE.MeshStandardMaterial({ color: accent, roughness: 0.3, metalness: 0.7 });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...pos);
      scene.add(mesh);
      nodeMeshes.push(mesh);
    });

    // Lines
    const lineMaterial = new THREE.LineBasicMaterial({ color: "#333", opacity: 0.7, transparent: true });
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = new THREE.Vector3(...nodes[i]);
        const b = new THREE.Vector3(...nodes[j]);
        if (a.distanceTo(b) < radius * 0.9) {
          const geometry = new THREE.BufferGeometry().setFromPoints([a, b]);
          const line = new THREE.Line(geometry, lineMaterial);
          scene.add(line);
        }
      }
    }

    // Animation
    let mouseX = 0, mouseY = 0;
    let frameId: number;

    const animate = () => {
      // Gentle rotation
      scene.rotation.y += 0.002;
      scene.rotation.x = Math.sin(Date.now() * 0.0005) * 0.08;
      // Parallax
      scene.position.x = mouseX * 0.5;
      scene.position.y = mouseY * 0.3;
      // Pulsation
      nodeMeshes.forEach((mesh, idx) => {
        mesh.scale.setScalar(1 + Math.sin(idx + Date.now() * 0.001) * 0.06);
      });
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    renderer.domElement.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // Responsive height
  const height = typeof window !== "undefined" ? Math.max(320, window.innerHeight * 0.55) : 400;

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height,
      maxWidth: "100vw",
      margin: "0 auto",
      background: "#fff",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 8px 32px rgba(0,0,0,0.08)"
    }}>
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -60%)",
        width: "100%",
        textAlign: "center",
        pointerEvents: "none",
        zIndex: 2,
        color: "#000",
        fontFamily: "'Space Grotesk Variable', 'Montserrat', sans-serif",
        fontWeight: 700,
        fontSize: "2.2rem",
        letterSpacing: "-0.02em",
        textShadow: "0 2px 12px #fff"
      }}>
        Bradley Matera — Full Stack Software Engineer / Cloud Architect.
      </div>
    </div>
  );
};

export default ThreeHeroPlain;
