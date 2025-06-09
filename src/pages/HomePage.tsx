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

    gsap.from(subtitle.current, {
      duration: 2,
      delay: 0.5,
      opacity: 0,
      y: 50,
      ease: "power3.out",
    });
  }, []);

  return (
    <>
      <div className="flex flex-col items-center mt-30">
        <h1 ref={title} className="text-[5rem] font-bold">
          David Bell
        </h1>
        <h2 ref={subtitle} className="text-2xl font-semibold mb-6">
          デビッド
        </h2>
      </div>
    </>
  );
}

export default HomePage;
