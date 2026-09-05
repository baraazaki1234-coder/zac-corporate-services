import { setRequestLocale } from 'next-intl/server';
import CreditBar from '@/components/CreditBar';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import AboutSnippet from '@/components/AboutSnippet';
import ContactCTA from '@/components/ContactCTA';
import Footer from '@/components/Footer';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <CreditBar />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <AboutSnippet />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
