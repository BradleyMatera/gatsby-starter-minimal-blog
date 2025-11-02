// src/components/NavSystemBadge.tsx
// Miniature network badge for navbar, beside BM logo. Subtle, crisp, ambient animation.

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ACCENT_RED = "#e23b2d";
const BG_COLOR = "#fff";
const OUTLINE_COLOR = "#222";
const LINE_COLOR = "#222";
const ORBIT_COUNT = 7;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

type OrbitParams = {
  r: number;
  size: number;
  angle0: number;
  z: number;
};

const NavSystemBadge: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // --- Setup ---
    const badgeHeight = 48; // px
    const badgeWidth = 120; // px
    const scale = 0.25; // 25% of hero size

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(BG_COLOR);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, badgeWidth / badgeHeight, 0.1, 100);
    camera.position.set(0, 0, 7 * scale);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(badgeWidth, badgeHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current?.appendChild(renderer.domElement);

    // Lighting: minimal, crisp
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.7);
    keyLight.position.set(-2, 3, 4);
    scene.add(keyLight);

    // --- Core Node ---
    // Central red sphere with heartbeat scale
    const coreGeometry = new THREE.SphereGeometry(0.45 * scale, 32, 32);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: ACCENT_RED,
      roughness: 0.18,
      metalness: 0.85,
      emissive: ACCENT_RED,
      emissiveIntensity: 0.13,
      envMapIntensity: 0.7,
    });
    const coreNode = new THREE.Mesh(coreGeometry, coreMaterial);
    coreNode.position.set(0, 0, 0);
    scene.add(coreNode);

    // --- Orbit Nodes ---
    // Clean radial symmetry, depth (vary z, size), spaced evenly
    const orbitNodes: THREE.Mesh[] = [];
    const orbitParams: OrbitParams[] = [];
    for (let i = 0; i < ORBIT_COUNT; i++) {
      const angle0 = (2 * Math.PI * i) / ORBIT_COUNT;
      orbitParams.push({
        r: (2.1 + Math.sin(i * 1.1) * 0.18) * scale,
        size: (0.22 + Math.cos(i * 0.8) * 0.07) * scale,
        angle0,
        z: (-0.3 + Math.sin(angle0) * 0.45) * scale,
      });
    }
    for (let i = 0; i < orbitParams.length; i++) {
      const { r, size, angle0, z } = orbitParams[i];
      const geometry = new THREE.SphereGeometry(size, 24, 24);
      const material = new THREE.MeshStandardMaterial({
        color: "#f7f7f7",
        roughness: 0.45,
        metalness: 0.22,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(r * Math.cos(angle0), r * Math.sin(angle0), z);
      // Thin black/red outline
      const outlineGeo = new THREE.SphereGeometry(size * 1.08, 16, 16);
      const outlineMat = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? OUTLINE_COLOR : ACCENT_RED, wireframe: true });
      const outline = new THREE.Mesh(outlineGeo, outlineMat);
      mesh.add(outline);
      scene.add(mesh);
      orbitNodes.push(mesh);
    }

    // --- Connection Lines ---
    // Each orbit node connects to core with a line
    const linkLines: THREE.Line[] = [];
    const linkPulseSpheres: { mesh: THREE.Mesh; t: number; speed: number; direction: number; offset: number }[] = [];
    for (let i = 0; i < orbitNodes.length; i++) {
      // Line geometry from core to orbit node
      const points = [coreNode.position.clone(), orbitNodes[i].position.clone()];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      // Line brightness based on z-depth
      const lineColor = new THREE.Color(LINE_COLOR).lerp(new THREE.Color("#888"), (orbitParams[i].z + 0.5 * scale) / (1.0 * scale));
      const material = new THREE.LineBasicMaterial({ color: lineColor, linewidth: 2 });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
      linkLines.push(line);

      // Data pulse sphere (red accent) that animates outward and loops back
      const pulseGeo = new THREE.SphereGeometry(0.06 * scale, 12, 12);
      const pulseMat = new THREE.MeshBasicMaterial({ color: ACCENT_RED });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      scene.add(pulseMesh);
      linkPulseSpheres.push({
        mesh: pulseMesh,
        t: Math.random(),
        speed: 0.7 + Math.random() * 0.5,
        direction: 1,
        offset: Math.random(),
      });
    }

    // --- Animation Loop ---
    let frameId: number;
    let time = 0;
    let isActive = true;

    const animate = () => {
      if (!isActive) return;
      time += 0.016;

      // Heartbeat for core node
      const scaleBeat = 1 + Math.sin(time * 1.2) * 0.03;
      coreNode.scale.set(scaleBeat, scaleBeat, scaleBeat);

      // Idle slow rotation of cluster
      scene.rotation.z = Math.sin(time * 0.12) * 0.08;
      scene.rotation.y = Math.cos(time * 0.09) * 0.07;

      // Orbit nodes: static positions, subtle self-rotation
      for (let i = 0; i < orbitNodes.length; i++) {
        orbitNodes[i].rotation.x += 0.008 * (i % 2 === 0 ? 1 : -1);
        orbitNodes[i].rotation.y += 0.006 * (i % 2 === 0 ? 1 : -1);
        // Update connection line geometry (static)
        const points = [coreNode.position.clone(), orbitNodes[i].position.clone()];
        linkLines[i].geometry.setFromPoints(points);
      }

      // Animate data pulses along lines (async intervals)
      for (let i = 0; i < linkPulseSpheres.length; i++) {
        let pulse = linkPulseSpheres[i];
        pulse.t += 0.012 * pulse.speed * pulse.direction;
        if (pulse.t > 1) {
          pulse.direction = -1;
          pulse.t = 1;
        }
        if (pulse.t < 0) {
          pulse.direction = 1;
          pulse.t = 0;
        }
        // Interpolate position along line
        const start = coreNode.position;
        const end = orbitNodes[i].position;
        const px = lerp(start.x, end.x, pulse.t);
        const py = lerp(start.y, end.y, pulse.t);
        const pz = lerp(start.z, end.z, pulse.t);
        pulse.mesh.position.set(px, py, pz);
        pulse.mesh.visible = Math.abs(pulse.t - 0.5) > 0.08;
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // --- Tab Visibility: pause/throttle animation ---
    const handleVisibility = () => {
      isActive = !document.hidden;
      if (isActive) animate();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // --- Resize Handling ---
    const handleResize = () => {
      renderer.setSize(badgeWidth, badgeHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      camera.aspect = badgeWidth / badgeHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="nav-system-badge"
      style={{
        width: "120px",
        height: "48px",
        display: "inline-block",
        verticalAlign: "middle",
        background: BG_COLOR,
        borderRadius: "8px",
        overflow: "hidden",
        marginLeft: "8px",
        boxShadow: "0 2px 8px rgba(226,59,45,0.06)",
      }}
    >
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default NavSystemBadge;
