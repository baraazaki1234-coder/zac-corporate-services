import { getTranslations, setRequestLocale } from 'next-intl/server';
import CreditBar from '@/components/CreditBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactCTA from '@/components/ContactCTA';
import { Building2, Truck, Stethoscope, Scale, Users, Check } from 'lucide-react';

const icons = [Building2, Truck, Stethoscope, Scale, Users];
const keys = ['facilities', 'supply', 'consulting', 'legal', 'relocation'] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'services' });
  return { title: `${t('pageTitle')} | ZAC Corporate Services`, description: t('pageSubtitle') };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('services');

  return (
    <>
      <CreditBar />
      <Navbar />
      <main>
        <section className="bg-ink py-24 text-paper">
          <div className="container-x max-w-2xl">
            <span className="eyebrow">{t('eyebrow')}</span>
            <h1 className="mt-4 text-4xl font-bold lg:text-5xl">{t('pageTitle')}</h1>
            <p className="mt-5 text-paper/75">{t('pageSubtitle')}</p>
          </div>
        </section>

        <section className="bg-paper py-20">
          <div className="container-x space-y-16">
            {keys.map((key, i) => {
              const Icon = icons[i];
              const points = t.raw(`detailed.${key}.points`) as string[];

              return (
                <div
                  key={key}
                  className="grid grid-cols-1 items-start gap-8 border-t border-line pt-10 lg:grid-cols-[220px_1fr]"
                >
                  <div className="flex items-center gap-4">
                    <Icon className="text-gold" size={32} strokeWidth={1.5} />
                    <h2 className="text-xl font-semibold text-ink">{t(`items.${key}.title`)}</h2>
                  </div>
                  <div>
                    <p className="text-ink-700">{t(`items.${key}.desc`)}</p>
                    <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm text-ink-700">
                          <Check className="mt-0.5 shrink-0 text-gold" size={16} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
