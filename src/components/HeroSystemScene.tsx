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
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // --- Responsive orbit count ---
    const isMobile = typeof window !== "undefined" && window.innerWidth < 700;
    const orbitCount = isMobile ? MOBILE_ORBIT_COUNT : DESKTOP_ORBIT_COUNT;

    // --- Setup ---
    const width = mountRef.current?.clientWidth || 900;
    const height = mountRef.current?.clientHeight || 400;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(BG_COLOR);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(isMobile ? 0 : 1.1, 0, 7);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current?.appendChild(renderer.domElement);

    // Lighting
    // Key light from top-left, ambient fill
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.85);
    keyLight.position.set(-2, 3, 4);
    scene.add(keyLight);
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    // --- Core Node ---
    // Central red sphere with specular edge, heartbeat scale
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
    coreNode.position.set(0, 0, 0);
    scene.add(coreNode);

    // --- Orbit Nodes ---
    // Clean radial symmetry, depth (vary z, size), spaced evenly
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
      const lineColor = new THREE.Color(LINE_COLOR).lerp(new THREE.Color("#888"), (orbitParams[i].z + 0.5) / 1.0);
      const material = new THREE.LineBasicMaterial({ color: lineColor, linewidth: 2 });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
      linkLines.push(line);

      // Data pulse sphere (red accent) that animates outward and loops back
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

    // --- Animation Loop ---
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    let frameId: number;
    let time = 0;

    const animate = () => {
      time += 0.016;

      // Heartbeat for core node
      const scale = 1 + Math.sin(time * 1.2) * 0.03;
      coreNode.scale.set(scale, scale, scale);

      // Orbit node motion (radial symmetry, depth)
      for (let i = 0; i < orbitNodes.length; i++) {
        const { r, size, speed, angle0, z } = orbitParams[i];
        const angle = angle0 + time * speed;
        const x = r * Math.cos(angle);
        const y = r * Math.sin(angle);
        const zz = z + Math.cos(angle * 0.7) * 0.18;
        orbitNodes[i].position.set(x, y, zz);
        // Subtle rotation on own axis
        orbitNodes[i].rotation.x += 0.008 * (i % 2 === 0 ? 1 : -1);
        orbitNodes[i].rotation.y += 0.006 * (i % 2 === 0 ? 1 : -1);
        // Update connection line geometry
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
        pulse.mesh.visible = Math.abs(pulse.t - 0.5) > 0.08; // Faint pulse, not always visible
      }

      // Parallax camera drift
      targetX = lerp(targetX, mouseX, 0.08);
      targetY = lerp(targetY, mouseY, 0.08);
      camera.position.x = (isMobile ? 0 : 1.1) + targetX * 1.1;
      camera.position.y = targetY * 0.7;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // --- Mouse/Touch Interaction ---
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let x = 0, y = 0;
      if (e instanceof MouseEvent) {
        x = e.clientX;
        y = e.clientY;
      } else if (e instanceof TouchEvent && e.touches.length > 0) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      }
      const rect = renderer.domElement.getBoundingClientRect();
      mouseX = ((x - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((y - rect.top) / rect.height - 0.5) * 2;
    };
    renderer.domElement.addEventListener("mousemove", handlePointerMove);
    renderer.domElement.addEventListener("touchmove", handlePointerMove);

    // --- Resize Handling ---
    const handleResize = () => {
      const w = mountRef.current?.clientWidth || 900;
      const h = mountRef.current?.clientHeight || 400;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(window.devicePixelRatio);
    };
    window.addEventListener("resize", handleResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(frameId);
      renderer.domElement.removeEventListener("mousemove", handlePointerMove);
      renderer.domElement.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // Bar hero height
  const height = 96;

  return (
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
      <div ref={mountRef} style={{ width: "96px", height: "96px", flexShrink: 0 }} />
      <div style={{
        textAlign: "left",
        color: "#000",
        fontFamily: "'Space Grotesk Variable', 'Montserrat', sans-serif",
        fontWeight: 700,
        fontSize: "1.6rem",
        letterSpacing: "-0.02em",
        textShadow: "0 2px 12px #fff"
      }}>
        Web Development (B.S.) | Cloud Computing | AWS | Full-Stack | JavaScript | Python | AI Workflows
      </div>
    </div>
  );
};

export default HeroSystemScene;
