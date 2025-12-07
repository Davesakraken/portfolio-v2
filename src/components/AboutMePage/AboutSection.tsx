import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import GlassContainer from "@/components/common/GlassContainer";

function AboutSection() {
  // Refs for animation targets
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraph1Ref = useRef<HTMLParagraphElement>(null);
  const paragraph2Ref = useRef<HTMLParagraphElement>(null);
  const paragraph3Ref = useRef<HTMLParagraphElement>(null);

  // GSAP entrance animations
  useGSAP(() => {
    if (!containerRef.current) return;

    // Phase 1: Container entrance
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      delay: 0.3, // Wait for FloatingTechStack to settle
    });

    // Phase 2: Text content stagger
    const textElements = [
      headingRef.current,
      paragraph1Ref.current,
      paragraph2Ref.current,
      paragraph3Ref.current,
    ].filter(Boolean);

    gsap.from(textElements, {
      opacity: 0,
      x: -30,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.15,
      delay: 0.5,
    });

    // Phase 3: Image entrance
    if (imageRef.current) {
      gsap.from(imageRef.current, {
        opacity: 0,
        x: 30,
        rotation: 15, // Start more rotated, animate to final tilt
        scale: 0.8,
        duration: 1,
        ease: "back.out(1.4)",
        delay: 0.7,
      });
    }
  }, []);

  // Image hover handlers
  const handleImageHover = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        rotation: 5,
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleImageLeave = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        rotation: 3,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  return (
    <GlassContainer
      variant="card"
      blur="xl"
      shadow="xl"
      rounded="xl"
      border={true}
      className="relative z-10 p-8 md:p-12 w-full max-w-6xl"
    >
      <div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-12 items-center"
      >
        {/* Text Content - Order 2 on mobile, 1 on desktop */}
        <div className="order-2 md:order-1">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold mb-6 font-['Jost_Variable']"
          >
            About Me
          </h2>
          <div className="space-y-4 text-base md:text-lg leading-relaxed opacity-90">
            <p ref={paragraph1Ref}>
              Hi i'm David, a frontend developer focused on building responsive web applications. I
              work primarily with React and TypeScript to create functional user interfaces.
            </p>
            <p ref={paragraph2Ref}>
              My background is in web development with emphasis on modern frontend technologies and
              animation libraries. I approach projects with attention to design detail and code
              quality.
            </p>
            <p ref={paragraph3Ref}>
              Outside of work, I stay current with web development trends and experiment with
              emerging technologies. I also enjoy playing drums and streaming games.
            </p>
          </div>
        </div>

        {/* Image - Order 1 on mobile, 2 on desktop */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <div
            ref={imageRef}
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
            className="relative rotate-2 md:rotate-3"
          >
            <div className="w-[200px] h-[250px] md:w-[280px] md:h-[350px] rounded-2xl overflow-hidden border-2 border-white/30 dark:border-white/20 shadow-2xl shadow-black/20 dark:shadow-black/40">
              <img
                src="/profile-placeholder.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </GlassContainer>
  );
}

export default AboutSection;
