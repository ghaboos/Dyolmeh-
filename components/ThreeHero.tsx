'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshTransmissionMaterial, OrbitControls, Sparkles } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Core() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.16;
    ref.current.rotation.y += delta * 0.24;
    ref.current.rotation.z += delta * 0.08;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
  });

  return (
    <Float speed={1.3} rotationIntensity={0.35} floatIntensity={0.7}>
      <mesh ref={ref} scale={1.35}>
        <icosahedronGeometry args={[1, 5]} />
        <MeshTransmissionMaterial
          backside
          thickness={0.8}
          roughness={0.18}
          transmission={0.92}
          ior={1.45}
          chromaticAberration={0.08}
          anisotropy={0.3}
          color="#d9b52e"
        />
      </mesh>
      <mesh scale={1.65} rotation={[Math.PI / 2, 0.3, 0]}>
        <torusGeometry args={[1.25, 0.008, 12, 160]} />
        <meshBasicMaterial color="#f5c542" transparent opacity={0.65} />
      </mesh>
      <mesh scale={1.8} rotation={[0.4, Math.PI / 2, 0.7]}>
        <torusGeometry args={[1.15, 0.006, 12, 160]} />
        <meshBasicMaterial color="#fff1a8" transparent opacity={0.35} />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5.5], fov: 38 }} dpr={[1, 1.8]}>
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 3, 4]} intensity={20} color="#f5c542" />
      <pointLight position={[-3, -2, 2]} intensity={12} color="#6d5cff" />
      <Core />
      <Sparkles count={100} scale={7} size={1.4} speed={0.25} color="#f5c542" />
      <Environment preset="night" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} />
    </Canvas>
  );
}

export default function ThreeHero() {
  return <div className="three-hero"><Scene /></div>;
}
