import React from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const AnimatedSection = ({
  children,
  className = "",
  animationType = "fadeUp",
  delay = 0,
  duration = 600,
}) => {
  const [ref, isVisible] = useScrollAnimation();

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  const finalIsVisible = isMobile ? true : isVisible;

  const getAnimationClasses = () => {
    const baseClasses = `transition-all ease-out will-change-transform`;

    if (isMobile) {
      return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100`;
    }

    if (!finalIsVisible) {
      switch (animationType) {
        case "fadeUp":
          return `${baseClasses} opacity-0 translate-y-8`;
        case "fadeIn":
          return `${baseClasses} opacity-0`;
        case "slideLeft":
          return `${baseClasses} opacity-0 -translate-x-8`;
        case "slideRight":
          return `${baseClasses} opacity-0 translate-x-8`;
        case "scale":
          return `${baseClasses} opacity-0 scale-95`;
        default:
          return `${baseClasses} opacity-0 translate-y-8`;
      }
    } else {
      return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100`;
    }
  };

  const style = {
    transitionDuration: isMobile ? "0ms" : `${duration}ms`,
    ...(delay > 0 && !isMobile && { transitionDelay: `${delay}ms` }),
  };

  return (
    <div ref={ref} className={`${getAnimationClasses()} ${className}`} style={style}>
      {children}
    </div>
  );
};

export default AnimatedSection;
