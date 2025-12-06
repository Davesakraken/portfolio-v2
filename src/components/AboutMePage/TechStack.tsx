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
  iconClassName?: string;
  className?: string;
  trigger?: React.RefObject<HTMLDivElement | null>;
  animation?: AnimationVariant;
}

export const TechStack = ({
  trigger,
  className,
  iconClassName,
  animation = "fade-scale",
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
      <JavaScriptIcon className={iconClassName} />
      <TypeScriptIcon className={iconClassName} />
      <CssIcon className={iconClassName} />
      <ReactIcon className={iconClassName} />
      <TailwindIcon className={iconClassName} />
      <NextIcon className={iconClassName} />
      <MantineIcon className={iconClassName} />
    </div>
  );
};
