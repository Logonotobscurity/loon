import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../Global/SectionWrapper';
import { CTAButton } from '../Global/CTAButton';
import { copy } from '../../copy';

const AnimatedBlob = () => {
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

export const HeroSection = () => {
  return (
    <SectionWrapper id="hero" className="relative overflow-hidden min-h-[100dvh] flex items-center pt-16 sm:pt-20">
      {/* 3D Animation - hidden on small mobile */}
      <div className="absolute inset-0 z-0 opacity-20 sm:opacity-30 md:opacity-100 md:w-1/2 md:right-0 md:left-auto">
        <AnimatedBlob />
      </div>
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left px-4 sm:px-0">
          <h1 className="mb-4 sm:mb-6 font-satoshi font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tight bg-gradient-to-r from-primary via-accent-blue to-accent-purple bg-clip-text text-transparent">
            {copy.hero.headline}
          </h1>
          <h2 className="mt-4 sm:mt-6 max-w-2xl mx-auto md:mx-0 text-text-white-80 font-inter text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed px-2 sm:px-0">
            {copy.hero.subheadline}
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start px-4 sm:px-0"
          >
            <CTAButton 
              variant="primary" 
              className="w-full sm:w-auto !px-6 sm:!px-8 !py-3 sm:!py-4 text-sm sm:text-base"
              onClick={() => {
                const element = document.getElementById('capabilities');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {copy.hero.cta}
            </CTAButton>
            <CTAButton variant="secondary" className="w-full sm:w-auto !px-6 sm:!px-8 !py-3 sm:!py-4 text-sm sm:text-base">
              Request a Demo
            </CTAButton>
          </motion.div>
        </motion.div>
        {/* This space is intentionally left blank for the 3D model on desktop */}
      </div>
    </SectionWrapper>
  );
};
