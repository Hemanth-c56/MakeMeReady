import { Features } from '~/components/dashboard/features';
import { Footer } from '~/components/dashboard/footer';
import { Hero } from '~/components/dashboard/hero';
import { HowItWorks } from '~/components/dashboard/how-it-works';
import { Navbar } from '~/components/dashboard/navbar';
import { SocialProof } from '~/components/dashboard/social-proof';

export default function Home() {
  return (
    <main className="bg-background">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <SocialProof />
      <Footer />
    </main>
  );
}
