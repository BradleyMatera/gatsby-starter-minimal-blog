import * as React from "react";
import * as THREE from "three";

const RecruiterHero3D: React.FC = () => {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    if (!isClient || !mountRef.current) return undefined;

    const mount = mountRef.current;
    const width = mount.clientWidth || 300;
    const height = mount.clientHeight || 300;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 3.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0xb0a89e,
      roughness: 0.35,
      metalness: 0.2,
      flatShading: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(3, 3, 5);
    scene.add(directionalLight);

    const rimLight = new THREE.DirectionalLight(0x7a6b5d, 0.8);
    rimLight.position.set(-3, -2, 2);
    scene.add(rimLight);

    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotationY = x * 1.2;
      targetRotationX = y * 1.2;
    };

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frameId: number;
    const animate = () => {
      if (!prefersReducedMotion) {
        mesh.rotation.y += 0.003;
        mesh.rotation.x += 0.0015;
        mesh.rotation.y += (targetRotationY - mesh.rotation.y) * 0.03;
        mesh.rotation.x += (targetRotationX - mesh.rotation.x) * 0.03;
      }
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    mount.addEventListener("mousemove", onMove);
    animate();

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      mount.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [isClient]);

  if (!isClient) {
    return <div ref={mountRef} className="recruiter-hero-3d" aria-hidden="true" />;
  }

  return <div ref={mountRef} className="recruiter-hero-3d" aria-hidden="true" />;
};

export default RecruiterHero3D;
