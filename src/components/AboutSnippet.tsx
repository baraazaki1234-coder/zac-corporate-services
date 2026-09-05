'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';

export default function AboutSnippet() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <section id="about" className="bg-ink-900 py-24 text-paper">
      <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: locale === 'ar' ? 24 : -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="aspect-[4/3] w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1600&auto=format&fit=crop')"
          }}
        />
        <div>
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className="mt-4 text-3xl font-bold lg:text-4xl">{t('title')}</h2>
          <p className="mt-5 max-w-lg text-paper/70">{t('body')}</p>
          <a
            href={`/${locale}/about`}
            className="mt-8 inline-block border-b border-gold pb-1 text-sm font-semibold text-gold transition hover:border-paper hover:text-paper"
          >
            {t('cta')} →
          </a>
        </div>
      </div>
    </section>
  );
}
