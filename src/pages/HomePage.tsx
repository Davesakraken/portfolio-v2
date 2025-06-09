import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

function HomePage() {
  const title = useRef<HTMLHeadingElement>(null);
  const subtitle = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.from(title.current, {
      duration: 2,
      opacity: 0,
      y: 50,
      ease: "power3.out",
    });

    // Split text into spans for each character
    if (subtitle.current) {
      const text = subtitle.current.textContent;
      subtitle.current.innerHTML = text!
        .split("")
        .map((char) => `<span class="inline-block">${char}</span>`)
        .join("");

      // Animate each character
      gsap.from(subtitle.current.children, {
        duration: 1,
        delay: 0.8,
        opacity: 0,
        y: 30,
        rotation: 180,
        ease: "back.out(1.7)",
        stagger: 0.1,
      });
    }
  }, []);

  return (
    <>
      <div className="flex flex-col items-center mt-30">
        <div className="relative top-0 right-0">
          <h1 ref={title} className="text-[5rem] font-bold">
            David Bell
          </h1>
          <h2
            ref={subtitle}
            className="absolute top-10 right-[-20px] text-2xl writing-mode-vertical-rl font-bold"
            style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
          >
            デビッド
          </h2>
        </div>
      </div>
    </>
  );
}

export default HomePage;
