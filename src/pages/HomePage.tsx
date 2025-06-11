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
        <div className="relative top-0 right-0">
          <h1 ref={title} className="text-[5rem] font-bold">
            David Bell
          </h1>
          <StaggeredHiragana className="absolute top-5.5 right-[-25px]">デビッド</StaggeredHiragana>
        </div>
      </div>
    </>
  );
}

export default HomePage;
