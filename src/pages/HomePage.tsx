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
