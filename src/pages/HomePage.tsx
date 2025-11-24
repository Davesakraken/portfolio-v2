import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import StaggeredHiragana from "@/components/StaggeredHiragana";

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const title = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.from(title.current, {
      duration: 2,
      opacity: 0,
      y: 50,
      ease: "power3.out",
    });
  }, []);

  return (
    <>
      <section className="flex flex-col min-h-[97dvh] overflow-hidden justify-center items-center text-center sm:mt-6">
        <div className="relative sm:mb-36 mb-10">
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
          className="absolute left-[-80px] bottom-[-10%] scale-80 -z-40"
          src="/anime-character.png"
        />
      </section>
    </>
  );
}

export default HomePage;
