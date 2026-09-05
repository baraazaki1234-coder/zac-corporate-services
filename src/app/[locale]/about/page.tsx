import { getTranslations, setRequestLocale } from 'next-intl/server';
import CreditBar from '@/components/CreditBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactCTA from '@/components/ContactCTA';
import { ShieldCheck, Layers, Globe2, Target } from 'lucide-react';

const valueIcons = [ShieldCheck, Layers, Globe2, Target];
const valueKeys = ['experience', 'integrated', 'regional', 'commitment'] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'aboutPage' });
  return { title: `${t('title')} | ZAC Corporate Services`, description: t('intro') };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('aboutPage');

  return (
    <>
      <CreditBar />
      <Navbar />
      <main>
        <section className="bg-ink py-24 text-paper">
          <div className="container-x max-w-3xl">
            <span className="eyebrow">{t('eyebrow')}</span>
            <h1 className="mt-4 text-4xl font-bold lg:text-5xl">{t('title')}</h1>
            <p className="mt-6 text-lg text-paper/75">{t('intro')}</p>
          </div>
        </section>

        <section className="bg-paper py-20">
          <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="border-s-2 border-gold ps-6">
              <h2 className="text-xl font-semibold text-ink">{t('missionTitle')}</h2>
              <p className="mt-3 text-ink-700">{t('mission')}</p>
            </div>
            <div className="border-s-2 border-gold ps-6">
              <h2 className="text-xl font-semibold text-ink">{t('visionTitle')}</h2>
              <p className="mt-3 text-ink-700">{t('vision')}</p>
            </div>
          </div>
        </section>

        <section className="bg-ink-900 py-20 text-paper">
          <div className="container-x">
            <h2 className="text-2xl font-bold lg:text-3xl">{t('valuesTitle')}</h2>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {valueKeys.map((key, i) => {
                const Icon = valueIcons[i];
                return (
                  <div key={key}>
                    <Icon className="text-gold" size={26} strokeWidth={1.6} />
                    <h3 className="mt-4 font-semibold">{t(`values.${key}.title`)}</h3>
                    <p className="mt-2 text-sm text-paper/70">{t(`values.${key}.desc`)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
