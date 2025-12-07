import { FloatingTechStack } from "@/components/AboutMePage/FloatingTechStack";
import AboutSection from "@/components/AboutMePage/AboutSection";

function AboutMePage() {
  return (
    <>
      <FloatingTechStack />
      <div className="flex items-center justify-center min-h-[calc(100vh-7rem)] px-4">
        <AboutSection />
      </div>
    </>
  );
}

export default AboutMePage;
