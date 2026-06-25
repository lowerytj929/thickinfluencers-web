import Hero from "@/components/sections/Hero";
import PricingMenu from "@/components/sections/PricingMenu";
import FreePreviewCTA from "@/components/sections/FreePreviewCTA";
import TrustSafety from "@/components/sections/TrustSafety";
import FAQ from "@/components/sections/FAQ";
import ContactSupport from "@/components/sections/ContactSupport";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="flex-grow flex flex-col items-center w-full">
      <Hero />
      <PricingMenu />
      <FreePreviewCTA />
      <TrustSafety />
      <FAQ />
      <ContactSupport />
      <Footer />
    </main>
  );
}
