'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Building2, Truck, Stethoscope, Scale, Users } from 'lucide-react';

const icons = [Building2, Truck, Stethoscope, Scale, Users];
const keys = ['facilities', 'supply', 'consulting', 'legal', 'relocation'] as const;

export default function Services() {
  const t = useTranslations('services');

  return (
    <section id="services" className="bg-paper py-24">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className="mt-4 text-3xl font-bold text-ink lg:text-4xl">{t('title')}</h2>
          <p className="mt-4 text-ink-700">{t('subtitle')}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {keys.map((key, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group bg-paper p-8 transition-colors hover:bg-ink"
              >
                <Icon className="text-gold" size={28} strokeWidth={1.6} />
                <h3 className="mt-5 text-lg font-semibold text-ink group-hover:text-paper">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700 group-hover:text-paper/70">
                  {t(`items.${key}.desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
