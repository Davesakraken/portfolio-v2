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
interface TechStackProps {
  trigger: React.RefObject<HTMLDivElement | null>;
}

export const TechStack = ({ trigger }: TechStackProps) => {
  const iconsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (iconsRef.current) {
      gsap.set(iconsRef.current.children, { opacity: 0, scale: 0.8, y: 60, x: -20 });

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
    }
  }, [trigger]);

  return (
    <div ref={iconsRef} className="flex absolute right-0 top-0 gap-2">
      <JavaScriptIcon className="w-12 h-12 mb-4" />
      <TypeScriptIcon className="w-12 h-12 mb-4" />
      <CssIcon className="w-12 h-12 mb-4" />
      <ReactIcon className="w-12 h-12 mb-4" />
      <TailwindIcon className="w-12 h-12 mb-4" />
      <NextIcon className="w-12 h-12 mb-4" />
      <MantineIcon className="w-12 h-12 mb-4" />
    </div>
  );
};
