import { getTranslations, setRequestLocale } from 'next-intl/server';
import CreditBar from '@/components/CreditBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FaqAccordion from '@/components/FaqAccordion';
import ContactCTA from '@/components/ContactCTA';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'faqPage' });
  return { title: `${t('title')} | ZAC Corporate Services`, description: t('subtitle') };
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('faqPage');
  const items = t.raw('items') as { q: string; a: string }[];

  return (
    <>
      <CreditBar />
      <Navbar />
      <main>
        <section className="bg-ink py-20 text-paper">
          <div className="container-x max-w-2xl">
            <span className="eyebrow">{t('eyebrow')}</span>
            <h1 className="mt-4 text-4xl font-bold lg:text-5xl">{t('title')}</h1>
            <p className="mt-5 text-paper/75">{t('subtitle')}</p>
          </div>
        </section>

        <section className="bg-paper py-16">
          <div className="container-x max-w-3xl">
            <FaqAccordion items={items} />
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
