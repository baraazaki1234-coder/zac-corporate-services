import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './locales';

export default getRequestConfig(async ({ requestLocale }) => {
  // `requestLocale` is a Promise in current next-intl — must be awaited.
  // Validate against the known locales array manually (avoids relying on
  // `hasLocale`, which isn't exported by the next-intl version installed
  // here). Always fall back to a valid locale so getRequestConfig never
  // returns undefined — that was the source of the original build error.
  const requested = await requestLocale;
  const locale = locales.includes(requested as (typeof locales)[number])
    ? (requested as (typeof locales)[number])
    : defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
