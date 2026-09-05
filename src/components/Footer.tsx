import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Facebook, MessageCircle } from 'lucide-react';
import Logo from './Logo';
import { ZAC, DEVELOPER } from '@/config/contact';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const locale = useLocale();

  const links = [
    { href: `/${locale}#services`, label: nav('services') },
    { href: `/${locale}#about`, label: nav('about') },
    { href: `/${locale}/faq`, label: nav('faq') },
    { href: `/${locale}/contact`, label: nav('contact') }
  ];

  return (
    <footer className="bg-ink-900 text-paper/70">
      <div className="container-x grid grid-cols-1 gap-10 py-16 sm:grid-cols-3">
        <div>
          <Logo variant="light" />
          <p className="mt-3 max-w-xs text-sm">{t('tagline')}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-paper">{t('quickLinks')}</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-gold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-paper">{t('contact')}</h4>
          <div className="mt-4 flex items-center gap-4">
            <a
              href={`https://wa.me/${ZAC.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-gold"
            >
              <MessageCircle size={16} /> {ZAC.whatsappDisplay}
            </a>
          </div>
          <a
            href={ZAC.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center gap-2 text-sm hover:text-gold"
          >
            <Facebook size={16} /> Facebook
          </a>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs sm:flex-row">
          <span>{t('rights')}</span>
          <span>
            {t('credit')}{' '}
            <Link
              href={DEVELOPER.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold hover:text-paper"
            >
              {DEVELOPER.name}
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
