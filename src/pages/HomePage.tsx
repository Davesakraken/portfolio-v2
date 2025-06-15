import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import StaggeredHiragana from "@/components/StaggeredHiragana";

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
      <div className="flex flex-col items-center mt-30">
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
      </div>
    </>
  );
}

export default HomePage;
