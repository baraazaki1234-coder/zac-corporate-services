'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 1.6, ease: 'easeOut' });
      return controls.stop;
    }
  }, [inView, to, count]);

  return (
    <span ref={ref} className="text-4xl font-bold text-ink lg:text-5xl">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function Stats() {
  const t = useTranslations('stats');

  const stats = [
    { value: 25, suffix: '+', label: t('experience') },
    { value: 6, suffix: '+', label: t('sectors') },
    { value: 5, suffix: '+', label: t('region') },
    { value: 100, suffix: '%', label: t('commitment') }
  ];

  return (
    <section className="border-y border-line bg-paper py-16">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-s-2 border-gold/40 ps-5">
              <Counter to={s.value} suffix={s.suffix} />
              <p className="mt-2 text-sm text-ink-700">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-ink-600/70">{t('note')}</p>
      </div>
    </section>
  );
}
