import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import {
  JavaScriptIcon,
  CssIcon,
  ReactIcon,
  TailwindIcon,
  NextIcon,
  MantineIcon,
  TypeScriptIcon,
} from "../icons";

gsap.registerPlugin(ScrollTrigger);

type AnimationVariant = "slide-from-corner" | "fade-scale";

interface TechStackProps {
  trigger?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  animation?: AnimationVariant;
  iconSize?: string;
}

export const TechStack = ({
  trigger,
  className,
  animation = "fade-scale",
  iconSize = "w-6 sm:h-6",
}: TechStackProps) => {
  const iconsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!iconsRef.current) return;

    if (animation === "slide-from-corner") {
      // Original animation - position specific
      gsap.set(iconsRef.current.children, {
        opacity: 0,
        scale: 0.8,
        y: 60,
        x: -20,
      });

      gsap.to(iconsRef.current.children, {
        duration: 0.8,
        opacity: 1,
        y: 10,
        x: -20,
        scale: 1,
        ease: "back.out(1.7)",
        stagger: 0.1,
        scrollTrigger: {
          trigger: trigger?.current || iconsRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    } else if (animation === "fade-scale") {
      // Simple reusable animation - works anywhere
      gsap.set(iconsRef.current.children, {
        opacity: 0,
        scale: 0.5,
      });

      gsap.to(iconsRef.current.children, {
        duration: 0.6,
        opacity: 1,
        scale: 1,
        ease: "back.out(1.7)",
        stagger: 0.08,
        scrollTrigger: {
          trigger: iconsRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, [trigger, animation]);

  return (
    <div ref={iconsRef} className={`flex flex-wrap gap-2 ${className}`}>
      <JavaScriptIcon className={iconSize} />
      <TypeScriptIcon className={iconSize} />
      <CssIcon className={iconSize} />
      <ReactIcon className={iconSize} />
      <TailwindIcon className={iconSize} />
      <NextIcon className={iconSize} />
      <MantineIcon className={iconSize} />
    </div>
  );
};
