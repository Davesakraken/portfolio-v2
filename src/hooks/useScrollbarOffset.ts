import { useState, useEffect } from "react";

/**
 * Custom hook to calculate the scrollbar offset for centering elements
 * Returns half the scrollbar width to compensate for scrollbar-induced layout shifts
 */
export const useScrollbarOffset = (): number => {
  const [scrollbarOffset, setScrollbarOffset] = useState(0);

  useEffect(() => {
    const calculateOffset = () => {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      // Offset is half the scrollbar width since navbar is centered
      setScrollbarOffset(scrollbarWidth / 2);
    };

    // Initial calculation
    calculateOffset();

    // Check on resize
    window.addEventListener('resize', calculateOffset);

    // Use ResizeObserver to detect when document body size changes (scrollbar appears/disappears)
    const resizeObserver = new ResizeObserver(calculateOffset);
    resizeObserver.observe(document.documentElement);

    return () => {
      window.removeEventListener('resize', calculateOffset);
      resizeObserver.disconnect();
    };
  }, []);

  return scrollbarOffset;
};
