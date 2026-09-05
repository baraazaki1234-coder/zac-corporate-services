'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import Logo from './Logo';
import { ZAC } from '@/config/contact';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const otherLocale = locale === 'ar' ? 'en' : 'ar';
  const [open, setOpen] = useState(false);

  const links = [
    { href: `/${locale}#services`, label: t('services') },
    { href: `/${locale}#about`, label: t('about') },
    { href: `/${locale}/faq`, label: t('faq') },
    { href: `/${locale}/contact`, label: t('contact') }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <nav className="container-x flex h-20 items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2.5">
          <Logo />
          <span className="hidden h-5 w-px bg-line sm:block" />
          <span className="hidden text-xs text-ink-600 sm:block">Corporate Services</span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-ink-700 transition hover:text-gold">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href={`/${otherLocale}`}
            className="flex items-center gap-1.5 text-sm font-medium text-ink-700 hover:text-gold"
          >
            <Globe size={16} />
            {otherLocale === 'ar' ? 'العربية' : 'English'}
          </Link>
          <a
            href={`https://wa.me/${ZAC.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-gold"
          >
            {t('cta')}
          </a>
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-paper px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-ink-700">
                {link.label}
              </a>
            ))}
            <Link href={`/${otherLocale}`} className="text-sm font-medium text-ink-700">
              {otherLocale === 'ar' ? 'العربية' : 'English'}
            </Link>
            <a
              href={`https://wa.me/${ZAC.whatsapp}`}
              className="rounded bg-ink px-5 py-2.5 text-center text-sm font-semibold text-paper"
            >
              {t('cta')}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
