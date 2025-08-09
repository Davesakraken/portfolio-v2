import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import StaggeredHiragana from "@/components/StaggeredHiragana";
import GlassContainer from "@/components/common/GlassContainer";
import { TechStack } from "@/components/Containers/TechStack";

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const title = useRef<HTMLHeadingElement>(null);
  const container = useRef<HTMLDivElement>(null);

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
      <section className="flex flex-col h-[97.6dvh] justify-center items-center text-center">
        <div className="relative mb-36">
          <h1 ref={title} className="lg:text-[11rem] md:text-9xl sm:text-8xl text-5xl font-bold">
            <span className="sm:whitespace-nowrap">
              David Bell
              <StaggeredHiragana className="lg:text-2xl lg:right-[-25px] lg:top-6 md:text-xl md:right-[-19px] sm:text-[14px] sm:right-[-12px] sm:top-3 text-[11px] right-[-15px] top-1 md:top-4 ml-1 md:ml-2 lg:ml-3">
                デビッド
              </StaggeredHiragana>
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mt-6">
            Frontend Developer
          </h2>
        </div>
      </section>

      <section className="mb-40">
        <div className="flex mx-10">
          <GlassContainer
            ref={container}
            rounded="lg"
            className="flex flex-col p-5 items-left relative"
          >
            <TechStack trigger={container} />
            <h1 className="text-4xl font-semibold mb-4">My Stack</h1>
            <p className="text-md">
              I specialize in building modern web applications mainly using React, TypeScript, and
              Tailwind CSS. My focus is on creating responsive, accessible, and performant user
              interfaces that enhance the user experience. I also have experience with Next.js for
              server-side rendering and static site generation.
            </p>
          </GlassContainer>
        </div>
      </section>
    </>
  );
}

export default HomePage;
