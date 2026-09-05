'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ZAC } from '@/config/contact';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2000&auto=format&fit=crop')"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/60 via-ink-800/85 to-ink-800" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-x relative flex min-h-[88vh] flex-col justify-center py-28"
      >
        <motion.span variants={item} className="eyebrow mb-6">
          {t('eyebrow')}
        </motion.span>

        <motion.h1
          variants={item}
          className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
        >
          {t('title')}
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-xl text-lg text-paper/75">
          {t('subtitle')}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
          <a
            href={`https://wa.me/${ZAC.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-gold px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-gold-light"
          >
            {t('cta')}
          </a>
          <a
            href="#services"
            className="rounded border border-paper/30 px-7 py-3.5 text-sm font-semibold text-paper transition hover:border-gold hover:text-gold"
          >
            {t('ctaSecondary')}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
