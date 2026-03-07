// src/components/ThreeHeroPlain.tsx
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

function generateNodes(count: number, radius: number): [number, number, number][] {
  const nodes: [number, number, number][] = [];
  for (let i = 0; i < count; i += 1) {
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
    const mountEl = mountRef.current;
    if (!mountEl) {
      return undefined;
    }

    const width = mountEl.clientWidth || 800;
    const height = mountEl.clientHeight || 400;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#fff");

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 3.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountEl.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);
    const dir1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dir1.position.set(2, 2, 5);
    scene.add(dir1);
    const dir2 = new THREE.DirectionalLight(0xffffff, 0.6);
    dir2.position.set(-2, -2, -3);
    scene.add(dir2);

    const nodeCount = 36;
    const radius = 1.35;
    const accent = "#e23b2d";
    const nodes = generateNodes(nodeCount, radius);

    const nodeMeshes: THREE.Mesh[] = nodes.map((pos) => {
      const geometry = new THREE.SphereGeometry(0.06, 16, 16);
      const material = new THREE.MeshStandardMaterial({ color: accent, roughness: 0.3, metalness: 0.7 });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...pos);
      scene.add(mesh);
      return mesh;
    });

    const lineMaterial = new THREE.LineBasicMaterial({ color: "#333", opacity: 0.7, transparent: true });
    nodes.forEach((start, i) => {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const end = nodes[j];
        const a = new THREE.Vector3(...start);
        const b = new THREE.Vector3(...end);
        if (a.distanceTo(b) < radius * 0.9) {
          const geometry = new THREE.BufferGeometry().setFromPoints([a, b]);
          const line = new THREE.Line(geometry, lineMaterial);
          scene.add(line);
        }
      }
    });

    let mouseX = 0;
    let mouseY = 0;
    let frameId = 0;

    const animate = () => {
      scene.rotation.y += 0.002;
      scene.rotation.x = Math.sin(Date.now() * 0.0005) * 0.08;
      scene.position.x = mouseX * 0.5;
      scene.position.y = mouseY * 0.3;

      const elapsed = Date.now() * 0.001;
      nodeMeshes.forEach((mesh, idx) => {
        const scale = 1 + Math.sin(idx + elapsed) * 0.06;
        mesh.scale.setScalar(scale);
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    renderer.domElement.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(frameId);
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      mountEl.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="u-three-stage u-three-stage--tall">
      <div ref={mountRef} className="u-w-full u-h-full" />
      <div className="u-three-overlay u-three-overlay--surface">
        Bradley Matera — Full Stack Software Engineer / Cloud Architect.
        <a
          href="/contact"
          className="u-three-cta"
        >
          <span aria-hidden="true">✉</span>
          <span>Email me!</span>
        </a>
      </div>
      <p className="u-three-caption u-three-caption--surface">
        Shipping resilient cloud apps, experiment-driven UI, and platform automation workflows.
      </p>
    </div>
  );
};

export default ThreeHeroPlain;
// src/components/ThreeHeroPlain.tsx
