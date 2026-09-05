import { getTranslations, setRequestLocale } from 'next-intl/server';
import CreditBar from '@/components/CreditBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { MessageCircle, Phone } from 'lucide-react';
import { ZAC } from '@/config/contact';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contactPage' });
  return { title: `${t('title')} | ZAC Corporate Services`, description: t('subtitle') };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contactPage');

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

        <section className="bg-paper py-20">
          <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.2fr]">
            <div className="space-y-6">
              <a
                href={`https://wa.me/${ZAC.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded border border-line bg-ink px-6 py-5 text-paper transition hover:bg-gold hover:text-ink"
              >
                <MessageCircle size={22} />
                <div>
                  <p className="text-xs opacity-70">{t('whatsappLabel')}</p>
                  <p className="font-semibold">{ZAC.whatsappDisplay}</p>
                </div>
              </a>
              <a
                href={`tel:${ZAC.phone}`}
                className="flex items-center gap-4 rounded border border-line px-6 py-5 text-ink transition hover:border-gold"
              >
                <Phone size={22} className="text-gold" />
                <div>
                  <p className="text-xs text-ink-600">{t('phoneLabel')}</p>
                  <p className="font-semibold">{ZAC.whatsappDisplay}</p>
                </div>
              </a>
            </div>

            <div className="border border-line bg-paper p-8">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
