import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../Global/SectionWrapper';
import { CTAButton } from '../Global/CTAButton';
import { LeadGenerationModal } from './LeadGenerationModal';
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
  const [isModalOpen, setModalOpen] = React.useState(false);

  return (
    <SectionWrapper id="hero" className="relative overflow-hidden min-h-[100dvh] flex flex-col items-center justify-center pt-16 sm:pt-20">
      {/* 3D Animation - hidden on small mobile */}
      <div className="absolute inset-0 z-0 opacity-20 sm:opacity-30 md:opacity-100 md:w-1/2 md:right-0 md:left-auto">
        <AnimatedBlob />
      </div>
      <div className="relative z-10 text-center px-4 sm:px-0">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 sm:mb-6 font-satoshi font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tight bg-gradient-to-r from-primary via-accent-blue to-accent-purple bg-clip-text text-transparent"
        >
          {copy.hero.headline}
        </motion.h1>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 sm:mt-6 max-w-2xl mx-auto text-text-white-80 font-inter text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed px-2 sm:px-0"
        >
          {copy.hero.subheadline}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
        >
          <CTAButton 
            variant="primary" 
            className="w-full sm:w-auto !px-6 sm:!px-8 !py-3 sm:!py-4 text-sm sm:text-base"
            onClick={() => setModalOpen(true)}
          >
            {copy.hero.cta}
          </CTAButton>
          <CTAButton 
            variant="secondary" 
            className="w-full sm:w-auto !px-6 sm:!px-8 !py-3 sm:!py-4 text-sm sm:text-base"
            onClick={() => setModalOpen(true)}
          >
            Request a Demo
          </CTAButton>
        </motion.div>
      </div>

      {/* Lead Generation Modal */}
      <LeadGenerationModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </SectionWrapper>
  );
};
