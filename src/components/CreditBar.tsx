'use client';

import { useLocale } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { DEVELOPER } from '@/config/contact';

// Intentionally styled differently from ZAC's own gold CTA buttons
// (dark background, thin border, small text) so visitors never confuse
// this developer credit with a ZAC call-to-action.
export default function CreditBar() {
  const locale = useLocale();

  const text =
    locale === 'ar'
      ? `تم تصميم وتطوير هذا الموقع بواسطة ${DEVELOPER.name}`
      : `This website was designed and developed by ${DEVELOPER.name}`;
  const cta =
    locale === 'ar'
      ? `للتواصل: ${DEVELOPER.whatsappDisplay}`
      : `Contact: ${DEVELOPER.whatsappDisplay}`;

  return (
    <a
      href={`https://wa.me/${DEVELOPER.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 border-b border-paper/10 bg-ink-900 px-4 py-1.5 text-[11px] text-paper/60 transition hover:text-paper sm:text-xs"
    >
      <span>{text}</span>
      <span className="flex items-center gap-0.5 font-medium text-paper/85">
        {cta}
        <ArrowUpRight size={12} />
      </span>
    </a>
  );
}
