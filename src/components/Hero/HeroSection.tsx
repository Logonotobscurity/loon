import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../Global/SectionWrapper';
import ConversationDialogue from '../../features/conversation/ConversationDialogue';
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
  useEffect(() => {
    // Seed RAG on hero mount so context is available early
    import('../../features/conversation/seedRag').then(m => m.seedRagKnowledgeBase()).catch(() => {});
  }, []);

  return (
    <SectionWrapper id="hero" className="relative overflow-hidden min-h-[100dvh] flex flex-col items-center justify-center pt-16 sm:pt-20">
      {/* 3D Animation - hidden on small mobile */}
      <div className="absolute inset-0 z-0 opacity-20 sm:opacity-30 md:opacity-50">
        <AnimatedBlob />
      </div>
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
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
        
        {/* BI-GPT Conversation integrated in hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 sm:mt-12"
        >
          <ConversationDialogue startInHero={true} className="max-w-3xl mx-auto" />
        </motion.div>
      </div>
    </SectionWrapper>
  );
};
