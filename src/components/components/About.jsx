import React, { useState, useEffect, useRef } from "react";
import { FaTrophy, FaChartLine } from "react-icons/fa";
import AnimatedSection from "./AnimatedSection.jsx";
import AnimatedTargetIcon from "./AnimatedTargetIcon.jsx";
import AnimatedEyeIcon from "./AnimatedEyeIcon.jsx";
import AnimatedStarIcon from "./AnimatedStarIcon.jsx";
import { useStaggeredAnimation } from "../../hooks/useScrollAnimation.js";
import { useNavigate } from "react-router-dom";

// Custom hook to detect when an element enters the viewport
const useInView = (options) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const mobileOptions = {
      ...options,
      threshold: isMobile ? 0.1 : options.threshold || 0.3,
      rootMargin: isMobile ? "0px 0px -20px 0px" : options.rootMargin || "0px",
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, mobileOptions);

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [ref, options]);

  return [ref, isInView];
};

const ValueItem = ({ value, index }) => {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [renderIcon, setRenderIcon] = useState(false);
  const isEven = index % 2 === 0;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (isMobile) setRenderIcon(true);
    else if (isInView && !renderIcon) {
      const timer = setTimeout(() => setRenderIcon(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isInView, renderIcon, isMobile]);

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
        isMobile ? "" : "transition-all ease-in-out duration-1000"
      } ${
        isMobile || isInView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      } ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      <div
        className={`${isMobile ? "w-48 h-36" : "w-64 h-48"} ${
          value.bgColor
        } rounded-2xl flex items-center justify-center flex-shrink-0 p-4 ${
          isMobile ? "" : "transition-all duration-700 ease-out"
        } ${isMobile || isInView ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
      >
        {renderIcon}
      </div>

      <div
        className={`text-center ${isEven ? "md:text-left" : "md:text-right"} ${
          isMobile ? "" : "transition-opacity duration-700 delay-300 ease-out"
        } ${isMobile || isInView ? "opacity-100" : "opacity-0"}`}
      >
        <h3
          className={`${
            isMobile ? "text-xl" : "text-unified-3xl"
          } font-primary font-unified-bold text-gray-900 mb-4`}
        >
          {value.title}
        </h3>
        <p
          className={`${
            isMobile ? "text-sm" : "text-unified-lg"
          } font-primary font-unified-normal text-gray-700 leading-unified-relaxed`}
        >
          {value.description}
        </p>
      </div>
    </div>
  );
};

const About = () => {
  const [containerRef, visibleItems] = useStaggeredAnimation(5, 300);

  const values = [
    {
      icon: AnimatedTargetIcon,
      title: "Peer-to-Peer Contests",
      description:
        "Empowers users to test their knowledge, judgement and strategy against each other in a fun and rewarding way.",
      bgColor: "bg-green-300",
    },
    {
      icon: AnimatedEyeIcon,
      title: "Knowledge & Skill Games",
      description:
        "Facilitates knowledge/skill-based games like football trivia, general quiz battles, and more.",
      bgColor: "bg-[#38F5B8]",
    },
    {
      icon: AnimatedStarIcon,
      title: "Skill-Based Winning",
      description:
        "A social competition platform where knowledge gives users an edge. Only the skilled can win consistently.",
      bgColor: "bg-[#3C00FF]",
    },
    {
      icon: FaTrophy,
      title: "Social Decision Making",
      description:
        "In group competitions, users influence results through voting and consensus building, adding strategy and psychology beyond random chance.",
      bgColor: "bg-yellow-300",
    },
    {
      icon: FaChartLine,
      title: "Integrated Markets & Quizzes",
      description:
        "Whipple integrates trivia, quizzes, and forecast markets where real-world skills enhance users’ chances of success.",
      bgColor: "bg-red-300",
    },
  ];

const navigate = useNavigate()

  const handlesign = () =>{
    navigate("/signup")
  }
  return (
    <section
      className="py-20 text-gray-900 overflow-hidden relative"
      style={{
        background: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3), rgba(39, 171, 237, 0.3)), #f8fafc`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* === Intro === */}
        <AnimatedSection animationType="fadeUp" className="text-center mb-16">
          <AnimatedSection animationType="fadeUp" delay={200}>
            <h2 className="text-2xl md:text-unified-4xl font-primary font-unified-bold text-gray-900 mb-4">
              🎯 The Skill-Based Advantage
            </h2>
          </AnimatedSection>

          <AnimatedSection animationType="fadeUp" delay={400}>
            <p className="text-base md:text-unified-xl font-primary font-unified-normal text-gray-700 max-w-3xl mx-auto leading-unified-relaxed">
              Tired of leaving everything to chance? At Whipple, your knowledge
              can now give you the edge.
            </p>
          </AnimatedSection>

          <AnimatedSection animationType="fadeUp" delay={600}>
            <p className="text-base md:text-unified-xl font-primary font-unified-normal text-gray-700 max-w-3xl mx-auto leading-unified-relaxed">
              Take part in our Daily Knowledge Quizzes across categories like:
            </p>
            <ul className=" mt-4 space-y-2 text-gray-800 font-primary">
              <li>⚽ Sports</li>
              <li>🎬 Entertainment</li>
              <li>🎶 Music</li>
              <li>📰 Politics</li>
              <li>🌍 General Knowledge</li>
              <li>🎖️ Military</li>
              <li>🌱 Agriculture</li>
            </ul>
          </AnimatedSection>
        </AnimatedSection>

        {/* === How It Works === */}
        <AnimatedSection animationType="fadeUp" delay={200}>
          <h3 className="text-xl md:text-2xl font-unified-bold text-gray-900 mb-4 text-center">
            Here’s how it works:
          </h3>
          <ul className="list-disc list-inside text-gray-700 max-w-3xl mx-auto space-y-2">
            <li>✅ 40 Questions Daily – Multiple choice format.</li>
            <li>✅ 2 Points per Correct Answer – Earn up to 80 points daily.</li>
            <li>✅ No Repeated Questions – Fresh and unique daily.</li>
            <li>✅ Anti-Cheat System – Different questions per user.</li>
            <li>✅ Stay Engaged – Leave midway? Progress resets.</li>
          </ul>
        </AnimatedSection>

        {/* === Challenge === */}
        <AnimatedSection animationType="fadeUp" delay={400}>
          <h3 className="text-xl md:text-2xl font-unified-bold text-gray-900 mt-10 mb-4 text-center">
            ⏳ The Challenge
          </h3>
          <p className="text-gray-700 max-w-3xl mx-auto text-center leading-relaxed">
            You’ve got 5 seconds per question. Need more time? Pay ₦1,000 to
            extend a question to 1 minute.
          </p>
        </AnimatedSection>

        {/* === Rewards === */}
        <AnimatedSection animationType="fadeUp" delay={600}>
          <h3 className="text-xl md:text-2xl font-unified-bold text-gray-900 mt-10 mb-4 text-center">
            🏆 Rewards That Supercharge Your Game
          </h3>
          <ul className="space-y-4 text-gray-700 max-w-3xl mx-auto">
            <li>
              🎁 <strong>20 Points → Withdrawal Fee Waived</strong> (2.5% fee
              removed).
            </li>
            <li>
              🎁 <strong>40 Points → 25% Discount Boost</strong> – Play against
              the House or as the House at discounted rates.
            </li>
            <li>
              🎁 <strong>80 Points → Free Games & Admission</strong> – Unlimited
              free access for 24 hours.
            </li>
          </ul>
        </AnimatedSection>

        {/* === Why Whipple === */}
        <AnimatedSection animationType="fadeUp" delay={800}>
          <h3 className="text-xl md:text-2xl font-unified-bold text-gray-900 mt-10 mb-4 text-center">
            💡 Why Whipple?
          </h3>
          <ul className="space-y-2 text-gray-700 max-w-3xl mx-auto">
            <li>🔹 Peer-to-Peer Gaming</li>
            <li>🔹 Be the House</li>
            <li>🔹 Skill + Luck Combined</li>
            <li>🔹 Instant Wallet Withdrawals</li>
            <li>🔹 Daily Fresh Quizzes</li>
          </ul>
        </AnimatedSection>

        {/* === Values (icons) === */}
        <div ref={containerRef} className="space-y-24 mt-24">
          {values.map((value, index) => (
            <div
              key={index}
              className={`transition-all duration-800 ease-out ${
                visibleItems[index]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <ValueItem value={value} index={index} />
            </div>
          ))}
        </div>

        {/* === Call to Action === */}
        <AnimatedSection animationType="fadeUp" delay={1000}>
          <div className="mt-16 text-center">
            <h3 className="text-2xl md:text-3xl font-unified-bold text-gray-900 mb-4">
              🚀 Ready to Play Smarter?
            </h3>
            <p className="text-gray-700 max-w-2xl mx-auto mb-6">
              With Whipple’s Skill-Based Quiz system, you don’t just rely on
              chance – you earn your edge.
            </p>
            <button 
            onClick={handlesign}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-unified-bold hover:bg-blue-700 transition">
              👉 Sign Up & Start Playing
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}; 

export default About;
