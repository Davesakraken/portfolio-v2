import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import StaggeredHiragana from "@/components/StaggeredHiragana";
import GlassContainer from "@/components/common/GlassContainer";

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
      <section className="flex flex-col items-center h-[50svh] outline-1 outline-red-300">
        <div className="relative">
          <h1 ref={title} className="lg:text-[13rem] md:text-9xl sm:text-8xl text-5xl font-bold">
            <span className="sm:whitespace-nowrap">
              David Bell
              <StaggeredHiragana className="lg:text-4xl lg:right-[-25px] lg:top-7 md:text-xl md:right-[-19px] sm:text-[14px] sm:right-[-12px] sm:top-3 sm: text-[11px] right-[-15px] top-1 md:top-4 absolute ml-1 md:ml-2 lg:ml-3 inline-block">
                デビッド
              </StaggeredHiragana>
            </span>
          </h1>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
          <GlassContainer rounded="sm" className="p-5">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </GlassContainer>
          <GlassContainer rounded="sm" className="p-5">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </GlassContainer>
          <GlassContainer rounded="sm" className="p-5">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </GlassContainer>
        </div>
      </section>
    </>
  );
}

export default HomePage;
