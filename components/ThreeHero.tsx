'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial, Sparkles, Stars } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function EnergyCore() {
  const group = useRef<THREE.Group>(null);
  const crystal = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current || !crystal.current) return;
    const t = state.clock.elapsedTime;
    const pointer = state.pointer;

    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * 0.18, 0.035);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.3, 0.035);
    crystal.current.rotation.x += delta * 0.13;
    crystal.current.rotation.y += delta * 0.24;
    crystal.current.rotation.z += delta * 0.07;
    crystal.current.position.y = Math.sin(t * 0.9) * 0.09;

    if (ringA.current) ringA.current.rotation.z += delta * 0.42;
    if (ringB.current) ringB.current.rotation.x -= delta * 0.29;
    if (ringC.current) ringC.current.rotation.y += delta * 0.18;
  });

  return (
    <group ref={group}>
      <Float speed={1.15} rotationIntensity={0.18} floatIntensity={0.45}>
        <mesh ref={crystal} scale={1.3}>
          <icosahedronGeometry args={[1, 4]} />
          <MeshTransmissionMaterial
            backside
            samples={8}
            thickness={1.05}
            roughness={0.12}
            transmission={0.96}
            ior={1.42}
            chromaticAberration={0.11}
            anisotropy={0.45}
            color="#d9b52e"
          />
        </mesh>

        <mesh scale={1.62}>
          <sphereGeometry args={[1, 48, 48]} />
          <meshBasicMaterial color="#f5c542" transparent opacity={0.055} />
        </mesh>

        <mesh ref={ringA} rotation={[Math.PI / 2.3, 0.35, 0.2]}>
          <torusGeometry args={[1.5, 0.012, 12, 180]} />
          <meshBasicMaterial color="#f5c542" transparent opacity={0.8} />
        </mesh>

        <mesh ref={ringB} rotation={[0.55, Math.PI / 2.1, 0.45]}>
          <torusGeometry args={[1.73, 0.007, 10, 180]} />
          <meshBasicMaterial color="#bca8ff" transparent opacity={0.48} />
        </mesh>

        <mesh ref={ringC} rotation={[0.2, 0.8, Math.PI / 2.4]}>
          <torusGeometry args={[1.9, 0.004, 8, 180]} />
          <meshBasicMaterial color="#fff1a8" transparent opacity={0.25} />
        </mesh>

        <mesh rotation={[0.7, 0.25, 0.1]} scale={0.58}>
          <torusGeometry args={[1.15, 0.012, 10, 120]} />
          <meshBasicMaterial color="#6d5cff" transparent opacity={0.42} />
        </mesh>
      </Float>
    </group>
  );
}

function Scene() {
  return (
    <Canvas
      dpr={[1, 1.65]}
      camera={{ position: [0, 0, 6.1], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 7, 15]} />
      <ambientLight intensity={0.55} />
      <pointLight position={[3.8, 3.2, 4.5]} intensity={26} distance={9} color="#f5c542" />
      <pointLight position={[-4, -2, 2]} intensity={18} distance={8} color="#6d5cff" />
      <pointLight position={[0, 0, -3]} intensity={9} distance={7} color="#fff1a8" />
      <EnergyCore />
      <Sparkles count={180} scale={8.5} size={1.1} speed={0.2} color="#f5c542" />
      <Stars radius={8} depth={5} count={260} factor={1.5} saturation={0} fade speed={0.25} />
      <Environment preset="night" />
    </Canvas>
  );
}

export default function ThreeHero() {
  return <div className="three-hero"><Scene /></div>;
}
