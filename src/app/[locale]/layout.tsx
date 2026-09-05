import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { IBM_Plex_Sans_Arabic, IBM_Plex_Sans } from 'next/font/google';
import { SITE_URL } from '@/config/contact';
import { locales } from '@/i18n/locales';
import '../globals.css';

const arabicFont = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap'
});

const englishFont = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-english',
  display: 'swap'
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isAr = locale === 'ar';
  const title = isAr
    ? 'ZAC Corporate Services | خدمات طبية وقانونية متكاملة'
    : 'ZAC Corporate Services | Integrated Medical & Legal Services';
  const description = isAr
    ? 'شريكك الموثوق في تأسيس وترخيص المنشآت الطبية، والاستشارات الطبية والقانونية والبيطرية.'
    : 'Your trusted partner in establishing and licensing medical facilities, with medical, legal, and veterinary consulting.';

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}`,
      languages: { ar: '/ar', en: '/en' }
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}`,
      siteName: 'ZAC Corporate Services',
      locale: isAr ? 'ar_EG' : 'en_US',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body className={`${arabicFont.variable} ${englishFont.variable} ${locale === 'ar' ? 'font-arabic' : 'font-sans'} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
