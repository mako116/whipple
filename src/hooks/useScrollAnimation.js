import { useState, useEffect, useRef } from "react";

export const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.05, // Lower threshold for mobile
    rootMargin = "0px 0px -20px 0px", // Reduced margin for mobile
    triggerOnce = true,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold: isMobile ? 0.01 : threshold,
        rootMargin: isMobile ? "0px" : rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
};

export const useStaggeredAnimation = (itemCount, delay) => {
  const [visibleItems, setVisibleItems] = useState(
    new Array(itemCount).fill(false)
  );
  const [containerRef, isContainerVisible] = useScrollAnimation();

  useEffect(() => {
    if (isContainerVisible) {
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        setVisibleItems(new Array(itemCount).fill(true));
        return;
      }

      const timers = [];

      for (let i = 0; i < itemCount; i++) {
        const timer = setTimeout(() => {
          setVisibleItems((prev) => {
            const newState = [...prev];
            newState[i] = true;
            return newState;
          });
        }, i * delay);

        timers.push(timer);
      }

      return () => {
        timers.forEach((timer) => clearTimeout(timer));
      };
    }
  }, [isContainerVisible, itemCount, delay]);

  return [containerRef, visibleItems];
};
