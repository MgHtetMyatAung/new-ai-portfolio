import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { WorkExperience } from "@/components/work-experience";
import { Services } from "@/components/services";
import { WorkingProcess } from "@/components/working-process";
import { Skills } from "@/components/skills";
import { BentoGrid } from "@/components/bento-grid";
import { AIAssistantSection } from "@/components/ai-assistant-section";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <WorkExperience />
      <Services />
      <WorkingProcess />
      <Skills />
      <BentoGrid />
      <AIAssistantSection />
      <CTA />
      <Footer />
    </main>
  );
}
