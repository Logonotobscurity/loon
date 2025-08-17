import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

const AnimatedBlob: React.FC = () => {
  return (
    <Canvas aria-label="An abstract, rotating 3D blue blob">
      <Suspense fallback={null}>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        <ambientLight intensity={1} />
        <directionalLight position={[3, 2, 1]} />
        <Sphere args={[1, 100, 200]} scale={2.5}>
          <MeshDistortMaterial
            color="#1a66ff"
            attach="material"
            distort={0.5}
            speed={2}
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>
      </Suspense>
    </Canvas>
  );
};

export default AnimatedBlob;