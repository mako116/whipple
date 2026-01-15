import React from 'react';
import { Link } from 'react-router-dom';
import LavaLampBackground from './LavaLampBackground';
import AnimatedSection from './AnimatedSection';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Lava Lamp Background */}
      <LavaLampBackground />
      
      {/* Content - Properly centered both horizontally and vertically */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animationType="fadeUp" delay={200}>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-primary font-unified-bold text-gray-900 leading-unified-tight">
             Whipple –  "Your Knowledge, Your Advantage".
            
            </h1>
          </AnimatedSection>
          
          <AnimatedSection animationType="fadeUp" delay={400}>
            <h2 className="text-2xl md:text-2xl lg:text-3xl font-primary font-unified-bold text-gray-900 mt-2 leading-unified-tight">
Compete on Skill. Get rewarded through Performance.
            </h2>
          </AnimatedSection>
          
          <AnimatedSection animationType="fadeUp" delay={600}>
            <p className="mt-8 text-unified-lg md:text-unified-xl font-primary font-unified-normal text-gray-800 max-w-3xl mx-auto leading-unified-relaxed">
             A peer-to-peer skill-based participation platform where events are determined by ability and performance.
              </p>
          </AnimatedSection>
          
          <AnimatedSection animationType="fadeUp" delay={800}>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                // to="/onboarding" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-primary font-unified-semibold text-unified-base hover:bg-gray-200 transition-colors duration-200 shadow-lg"
              >
                Get Started
              </Link>
               
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Hero;