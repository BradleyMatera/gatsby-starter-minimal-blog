// @ts-nocheck
// src/components/ThreeHero.tsx
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Line } from "@react-three/drei";
import * as THREE from "three";

// Utility to generate node positions on a sphere
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

function NodeNetwork({ nodeCount = 32, radius = 1.2, accent = "#e23b2d" }) {
  const groupRef = useRef<THREE.Group>(null);
  const nodes = useMemo(() => generateNodes(nodeCount, radius), [nodeCount, radius]);

  // Animate rotation and parallax
  useFrame(({ clock, mouse }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.15;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.08;
      groupRef.current.position.x = mouse.x * 0.5;
      groupRef.current.position.y = mouse.y * 0.3;
    }
  });

  const AnimatedSphere = ({ position, index }: { position: [number, number, number]; index: number }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame(({ clock }) => {
      if (!meshRef.current) {
        return;
      }
      const scale = 1 + Math.sin(index + clock.getElapsedTime()) * 0.06;
      meshRef.current.scale.setScalar(scale);
    });

    return (
      <Sphere ref={meshRef} args={[0.06, 16, 16]} position={position}>
        <meshStandardMaterial color={accent} roughness={0.3} metalness={0.7} />
      </Sphere>
    );
  };

  // Connect every node to its nearest neighbors
  const lines = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = new THREE.Vector3(...nodes[i]);
      const b = new THREE.Vector3(...nodes[j]);
      if (a.distanceTo(b) < radius * 0.9) {
        lines.push([nodes[i], nodes[j]]);
      }
    }
  }

  return (
    <group ref={groupRef}>
      {nodes.map((pos, idx) => (
        <AnimatedSphere key={idx} position={[...pos] as [number, number, number]} index={idx} />
      ))}
      {lines.map(([start, end], idx) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore react-three-fiber type mismatch for drei Line helper
        return (
          <Line
            key={idx}
            points={[[...start] as [number, number, number], [...end] as [number, number, number]]}
            color={0x333333}
            lineWidth={1}
            transparent
            opacity={0.7}
          />
        );
      })}
    </group>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 5]} intensity={1.2} />
      <directionalLight position={[-2, -2, -3]} intensity={0.6} />
    </>
  );
}

const ThreeHero: React.FC = () => {
  return (
    <div className="u-three-stage u-three-stage--tall">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 60 }}
        className="u-three-canvas"
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <Lighting />
        <NodeNetwork nodeCount={36} radius={1.35} accent="#e23b2d" />
        {/* Remove OrbitControls for production, use only for debugging */}
        {/* <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} /> */}
      </Canvas>
      <div className="u-three-overlay u-three-overlay--surface">
        Bradley Matera — Full Stack Software Engineer / Cloud Architect.
      </div>
    </div>
  );
};

export default ThreeHero;
