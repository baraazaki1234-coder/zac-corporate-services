'use client';

import { useTranslations, useLocale } from 'next-intl';
import { MessageCircle, Send } from 'lucide-react';
import { ZAC } from '@/config/contact';

export default function ContactCTA() {
  const t = useTranslations('cta');
  const locale = useLocale();

  return (
    <section className="bg-paper py-24">
      <div className="container-x rounded border border-line bg-ink px-8 py-16 text-center text-paper sm:px-16">
        <h2 className="text-3xl font-bold lg:text-4xl">{t('title')}</h2>
        <p className="mx-auto mt-4 max-w-lg text-paper/70">{t('subtitle')}</p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <a
            href={`https://wa.me/${ZAC.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded bg-gold px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-gold-light"
          >
            <MessageCircle size={18} />
            {t('whatsapp')}
          </a>
          <a
            href={`/${locale}/contact`}
            className="flex items-center gap-2 rounded border border-paper/30 px-7 py-3.5 text-sm font-semibold text-paper transition hover:border-gold hover:text-gold"
          >
            <Send size={18} />
            {t('form')}
          </a>
        </div>
      </div>
    </section>
  );
}
