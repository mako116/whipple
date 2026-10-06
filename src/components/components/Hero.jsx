import React from "react";
import LavaLampBackground from "./LavaLampBackground";
import AnimatedSection from "./AnimatedSection";

/* Same palette as the About page
   sand #EADCC8 · parchment #F6EEE2 · umber #3B2A1E · bark #6B4F3A
   cocoa #2A1D14 · gold #C9A227 → #E3BE4F */

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#EADCC8]">
      {/* Animated background, softened so it sits under the brown palette */}
      <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none">
        <LavaLampBackground />
      </div>

      {/* Warm wash: lighter in the centre where the text sits, deeper at the edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(246,238,226,0.92) 0%, rgba(234,220,200,0.75) 45%, rgba(201,170,130,0.55) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-24 text-center">
          <AnimatedSection animationType="fadeUp" delay={200}>
            <p className="inline-block rounded-full border border-[#C9A227]/60 bg-[#F6EEE2]/80 px-5 py-2 text-[#8C6D12] font-primary font-semibold text-sm md:text-base">
              Your Knowledge, Your Advantage
            </p>
          </AnimatedSection>

          <AnimatedSection animationType="fadeUp" delay={350}>
            <h1 className="mt-8 font-primary font-bold text-6xl sm:text-7xl md:text-8xl leading-[0.95] text-[#3B2A1E]">
              Whipple
            </h1>
          </AnimatedSection>

          <AnimatedSection animationType="fadeUp" delay={500}>
            <h2 className="mt-6 font-primary font-semibold text-2xl md:text-3xl lg:text-4xl leading-snug text-[#6B4F3A] max-w-3xl mx-auto">
              Compete on skill. Get rewarded through performance.
            </h2>
          </AnimatedSection>

          <AnimatedSection animationType="fadeUp" delay={650}>
            <p className="mt-8 font-primary text-lg md:text-xl leading-relaxed text-[#4A3627] max-w-2xl mx-auto">
              Play free, ultra-short games, climb competitive leaderboards, use
              boosts, and compete for your place in weekly tournaments.
            </p>
          </AnimatedSection>

          <AnimatedSection animationType="fadeUp" delay={800}>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://app.mywhipple.com"
                className="inline-flex items-center justify-center px-10 py-4 rounded-full
                  bg-gradient-to-b from-[#E3BE4F] to-[#C9A227] text-[#2A1D14]
                  font-primary font-bold text-base md:text-lg tracking-wide
                  shadow-[0_6px_0_#8C6D12,0_12px_24px_rgba(140,109,18,0.35)]
                  hover:from-[#EBC85C] hover:to-[#D1AA2F]
                  active:translate-y-[3px] active:shadow-[0_3px_0_#8C6D12,0_6px_12px_rgba(140,109,18,0.3)]
                  focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C9A227]/50
                  transition-[transform,box-shadow,background] duration-150"
              >
                Start Playing
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection animationType="fadeUp" delay={950}>
            <p className="mt-8 font-primary text-sm text-[#6B4F3A]">
              Free to play · 15–60 seconds a game · Weekly tournaments
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Soft fade into the next section */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-[#EADCC8] pointer-events-none" />
    </section>
  );
};

export default Hero;