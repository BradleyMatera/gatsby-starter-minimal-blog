// src/components/HeroSystemScene.tsx
// Final hero scene: balanced, 3D, engineered cloud network system.

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ACCENT_RED = "#e23b2d";
const BG_COLOR = "#fff";
const OUTLINE_COLOR = "#222";
const LINE_COLOR = "#222";
const MOBILE_ORBIT_COUNT = 4;
const DESKTOP_ORBIT_COUNT = 7;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

type OrbitParams = {
  r: number;
  size: number;
  speed: number;
  angle0: number;
  z: number;
  pulseOffset: number;
};

const HeroSystemScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!canvasRef.current) {
        return;
      }

      const canvas = canvasRef.current;
      let frameId: number;
      let handlePointerMove: (e: MouseEvent | TouchEvent) => void;
      let handleResize: () => void;

      try {
        const isMobile = window.innerWidth < 700;
        const orbitCount = isMobile ? MOBILE_ORBIT_COUNT : DESKTOP_ORBIT_COUNT;

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        if (width === 0 || height === 0) {
          console.warn("HeroSystemScene: canvas has zero dimensions.");
          return;
        }

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(BG_COLOR);

      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
      camera.position.set(isMobile ? 0 : 1.1, 0, 7);

      if (!rendererRef.current) {
        rendererRef.current = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
        rendererRef.current.setSize(width, height);
        rendererRef.current.setPixelRatio(window.devicePixelRatio);
      }
      const renderer = rendererRef.current;

      const keyLight = new THREE.DirectionalLight(0xffffff, 0.85);
      keyLight.position.set(-2, 3, 4);
      scene.add(keyLight);
      scene.add(new THREE.AmbientLight(0xffffff, 0.35));

      const coreGeometry = new THREE.SphereGeometry(0.45, 32, 32);
      const coreMaterial = new THREE.MeshStandardMaterial({
        color: ACCENT_RED,
        roughness: 0.18,
        metalness: 0.85,
        emissive: ACCENT_RED,
        emissiveIntensity: 0.13,
        envMapIntensity: 0.7,
      });
      const coreNode = new THREE.Mesh(coreGeometry, coreMaterial);
      scene.add(coreNode);

      const orbitNodes: THREE.Mesh[] = [];
      const orbitParams: OrbitParams[] = [];
      for (let i = 0; i < orbitCount; i++) {
        const angle0 = (2 * Math.PI * i) / orbitCount;
        orbitParams.push({
          r: 2.1 + Math.sin(i * 1.1) * 0.18,
          size: 0.22 + Math.cos(i * 0.8) * 0.07,
          speed: 0.11 + i * 0.04,
          angle0,
          z: -0.3 + Math.sin(angle0) * 0.45,
          pulseOffset: Math.random(),
        });
      }
      for (let i = 0; i < orbitParams.length; i++) {
        const { r, size, angle0, z } = orbitParams[i];
        const geometry = new THREE.SphereGeometry(size, 24, 24);
        const material = new THREE.MeshStandardMaterial({ color: "#f7f7f7", roughness: 0.45, metalness: 0.22 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(r * Math.cos(angle0), r * Math.sin(angle0), z);
        const outlineGeo = new THREE.SphereGeometry(size * 1.08, 16, 16);
        const outlineMat = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? OUTLINE_COLOR : ACCENT_RED, wireframe: true });
        const outline = new THREE.Mesh(outlineGeo, outlineMat);
        mesh.add(outline);
        scene.add(mesh);
        orbitNodes.push(mesh);
      }

      const linkLines: THREE.Line[] = [];
      const linkPulseSpheres: { mesh: THREE.Mesh; t: number; speed: number; direction: number; offset: number }[] = [];
      for (let i = 0; i < orbitNodes.length; i++) {
        const points = [coreNode.position.clone(), orbitNodes[i].position.clone()];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineColor = new THREE.Color(LINE_COLOR).lerp(new THREE.Color("#888"), (orbitParams[i].z + 0.5) / 1.0);
        const material = new THREE.LineBasicMaterial({ color: lineColor, linewidth: 2 });
        const line = new THREE.Line(geometry, material);
        scene.add(line);
        linkLines.push(line);

        const pulseGeo = new THREE.SphereGeometry(0.06, 12, 12);
        const pulseMat = new THREE.MeshBasicMaterial({ color: ACCENT_RED });
        const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
        scene.add(pulseMesh);
        linkPulseSpheres.push({
          mesh: pulseMesh,
          t: orbitParams[i].pulseOffset,
          speed: 0.7 + Math.random() * 0.5,
          direction: 1,
          offset: orbitParams[i].pulseOffset,
        });
      }

      let mouseX = 0, mouseY = 0;
      let targetX = 0, targetY = 0;
      let time = 0;

      const animate = () => {
        time += 0.016;
        const scale = 1 + Math.sin(time * 1.2) * 0.03;
        coreNode.scale.set(scale, scale, scale);

        for (let i = 0; i < orbitNodes.length; i++) {
          const { r, speed, angle0, z } = orbitParams[i];
          const angle = angle0 + time * speed;
          const x = r * Math.cos(angle);
          const y = r * Math.sin(angle);
          const zz = z + Math.cos(angle * 0.7) * 0.18;
          orbitNodes[i].position.set(x, y, zz);
          orbitNodes[i].rotation.x += 0.008 * (i % 2 === 0 ? 1 : -1);
          orbitNodes[i].rotation.y += 0.006 * (i % 2 === 0 ? 1 : -1);
          const points = [coreNode.position.clone(), orbitNodes[i].position.clone()];
          linkLines[i].geometry.setFromPoints(points);
        }

        for (let i = 0; i < linkPulseSpheres.length; i++) {
          const pulse = linkPulseSpheres[i];
          pulse.t += 0.012 * pulse.speed * pulse.direction;
          if (pulse.t > 1) { pulse.direction = -1; pulse.t = 1; }
          if (pulse.t < 0) { pulse.direction = 1; pulse.t = 0; }
          const start = coreNode.position;
          const end = orbitNodes[i].position;
          pulse.mesh.position.lerpVectors(start, end, pulse.t);
          pulse.mesh.visible = Math.abs(pulse.t - 0.5) > 0.08;
        }

        targetX = lerp(targetX, mouseX, 0.08);
        targetY = lerp(targetY, mouseY, 0.08);
        camera.position.x = (isMobile ? 0 : 1.1) + targetX * 1.1;
        camera.position.y = targetY * 0.7;
        camera.lookAt(0, 0, 0);

        if (renderer) {
          renderer.render(scene, camera);
        }
        frameId = requestAnimationFrame(animate);
      };
      animate();

      handlePointerMove = (e: MouseEvent | TouchEvent) => {
        let x = 0, y = 0;
        if (e instanceof MouseEvent) {
          x = e.clientX; y = e.clientY;
        } else if (e instanceof TouchEvent && e.touches.length > 0) {
          x = e.touches[0].clientX; y = e.touches[0].clientY;
        }
        if (renderer) {
          const rect = renderer.domElement.getBoundingClientRect();
          mouseX = ((x - rect.left) / rect.width - 0.5) * 2;
          mouseY = ((y - rect.top) / rect.height - 0.5) * 2;
        }
      };
      if (renderer) {
        renderer.domElement.addEventListener("mousemove", handlePointerMove);
        renderer.domElement.addEventListener("touchmove", handlePointerMove);
      }

      handleResize = () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (w > 0 && h > 0 && renderer) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
          renderer.setPixelRatio(window.devicePixelRatio);
        }
      };
        window.addEventListener("resize", handleResize);

      } catch (error) {
        console.error("Error initializing Three.js scene:", error);
      }

      return () => {
        if (frameId) {
          cancelAnimationFrame(frameId);
        }
        window.removeEventListener("resize", handleResize);
        if (rendererRef.current) {
          rendererRef.current.domElement.removeEventListener("mousemove", handlePointerMove);
          rendererRef.current.domElement.removeEventListener("touchmove", handlePointerMove);
          rendererRef.current.dispose();
          rendererRef.current = null;
        }
      };
    }
  }, []);

  // Bar hero height
  const height = 96;

  return (
    <div style={{
      position: "relative",
      overflow: "hidden",
      width: "100%",
      height: `${height}px`,
      marginTop: "8px",
      marginBottom: "16px"
    }}>
      <div style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: `${height}px`,
        maxWidth: "100vw",
        margin: "0 auto",
        background: BG_COLOR,
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        gap: "2rem"
      }}>
        <div style={{ width: "96px", height: "96px", flexShrink: 0, position: "relative", overflow: "hidden" }}>
          <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
        </div>
        <div style={{
          textAlign: "left",
          color: "#000",
          fontFamily: "'Space Grotesk Variable', 'Montserrat', sans-serif",
          fontWeight: 700,
          fontSize: "1.6rem",
          letterSpacing: "-0.02em",
          textShadow: "0 2px 12px #fff"
        }}>
Early-career Web Dev (B.S. Oct 2025) · React/Express demos · Learning AWS + AI-assisted workflows        </div>
      </div>
    </div>
  );
};

export default HeroSystemScene;
