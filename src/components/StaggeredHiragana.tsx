import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap/gsap-core";

interface StaggeredHiraganaProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: string;
}

export default function StaggeredHiragana({ children, ...props }: StaggeredHiraganaProps) {
  const subtitle = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (subtitle.current) {
      let tl = gsap.timeline();
      for (const child of Array.from(subtitle.current.children).reverse()) {
        console.log(child);
        tl = tl.from(
          child,
          {
            duration: 1,
            opacity: 0,
            y: 30,
            rotation: 180,
            ease: "back.out(1.7)",
          },
          "<0.18"
        );
      }
    }
  }, []);
  return (
    <h2
      ref={subtitle}
      style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
      {...props}
      className={`${props.className} text-2xl writing-mode-vertical-rl font-bold`}
    >
      {children.split("").map((char, index) => (
        <span key={index} className="inline-block">
          {char}
        </span>
      ))}
    </h2>
  );
}
