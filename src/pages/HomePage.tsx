import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import StaggeredHiragana from "@/components/HomePage/StaggeredHiragana";

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const title = useRef<HTMLHeadingElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    gsap.from(title.current, {
      duration: 2,
      opacity: 0,
      y: 50,
      ease: "power3.out",
    });

    gsap.from(img.current, {
      duration: 2,
      delay: 0.5,
      opacity: 0,
      x: -200,
      ease: "power3.out",
    });
  }, []);

  return (
    <>
      <section className="flex justify-center items-center text-center h-full">
        <div className="relative mb-36">
          <h1 ref={title} className="lg:text-[11rem] md:text-9xl sm:text-8xl text-5xl font-bold">
            <span className="sm:whitespace-nowrap">
              David Bell
              <StaggeredHiragana className="lg:text-2xl lg:right-[-25px] lg:top-6 md:text-xl md:right-[-19px] sm:text-[14px] sm:right-[-12px] sm:top-3 text-[11px] right-[-15px] top-1 md:top-4 ml-1 md:ml-2 lg:ml-3">
                デビッド
              </StaggeredHiragana>
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold sm:mt-3">
            Frontend Developer
          </h2>
        </div>
        <img
          ref={img}
          className="fixed left-0 bottom-0 scale-80 origin-bottom-left -z-40 lg:opacity-100 opacity-40"
          src="/anime-character.png"
        />
      </section>
    </>
  );
}

export default HomePage;
