import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";

interface BlurBubblesProps {
  count?: number;
  className?: string;
}

const BlurBubbles: React.FC<BlurBubblesProps> = ({ count = 6, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      const bubbles = containerRef.current.children;

      // Initial animation for bubbles appearing
      gsap.fromTo(
        bubbles,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 2,
          ease: "power2.out",
          stagger: {
            amount: 1.5,
            from: "random",
          },
        }
      );

      // Continuous floating animation
      Array.from(bubbles).forEach((bubble, index) => {
        gsap.to(bubble, {
          y: `+=${Math.random() * 40 + 20}`,
          x: `+=${Math.random() * 30 + 15}`,
          rotation: Math.random() * 360,
          duration: Math.random() * 4 + 6,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.2,
        });

        // Additional subtle scale animation
        gsap.to(bubble, {
          scale: Math.random() * 0.3 + 0.8,
          duration: Math.random() * 3 + 4,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.3,
        });
      });
    }
  }, [count]);

  // Generate bubble configurations
  const bubbles = Array.from({ length: count }, (_, i) => {
    const size = Math.random() * 400 + 100; // 100px to 400px
    const top = Math.random() * 80 + 10; // 10% to 90% from top
    const left = Math.random() * 80 + 10; // 10% to 90% from left

    // Limited color palette: distinct blues, vibrant purples, and crimson reds
    const colorRanges = [
      { min: 210, max: 240 }, // Pure blues
      { min: 280, max: 320 }, // Vibrant purples/magentas
    ];

    const selectedRange = colorRanges[Math.floor(Math.random() * colorRanges.length)];
    let hue = Math.random() * (selectedRange.max - selectedRange.min) + selectedRange.min;

    // Handle the crimson red wrap-around
    if (hue >= 360) {
      hue = hue - 360;
    }

    const opacity = Math.random() * 0.3 + 0.1; // 0.1 to 0.4 opacity
    const blurAmount = Math.random() * 1 + 200; // 200px to 201px blur

    return {
      id: i,
      size,
      top,
      left,
      hue,
      opacity,
      blurAmount,
    };
  });

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none overflow-hidden -z-10 ${className}`}
    >
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            top: `${bubble.top}%`,
            left: `${bubble.left}%`,
            background: `radial-gradient(circle, 
              hsla(${bubble.hue}, 70%, 60%, ${bubble.opacity}) 0%, 
              hsla(${bubble.hue + 30}, 80%, 70%, ${bubble.opacity * 0.7}) 40%,
              hsla(${bubble.hue + 60}, 60%, 80%, ${bubble.opacity * 0.3}) 70%,
              transparent 100%)`,
            filter: `blur(${bubble.blurAmount}px)`,
            transform: `translate(-50%, -50%)`,
          }}
        />
      ))}
    </div>
  );
};

export default BlurBubbles;
