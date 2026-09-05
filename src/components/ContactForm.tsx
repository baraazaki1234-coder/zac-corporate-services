'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Send } from 'lucide-react';

const PHONE_REGEX = /^(\+?\d{1,4}[\s-]?)?\d{8,12}$/;

export default function ContactForm() {
  const t = useTranslations('contactPage.form');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const validate = () => {
    const name = form.name.trim();
    const phone = form.phone.trim();
    const message = form.message.trim();

    if (name.length < 2 || name.length > 80) return t('errorName');
    if (!PHONE_REGEX.test(phone)) return t('errorPhone');
    if (message.length > 1000) return t('errorMessage');
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setFieldError(validationError);
      return;
    }
    setFieldError(null);
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          message: form.message.trim()
        })
      });
      if (res.status === 429) {
        setStatus('error');
        setFieldError(t('errorRateLimit'));
        return;
      }
      if (!res.ok) throw new Error('failed');
      setStatus('success');
      setForm({ name: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-ink">{t('name')}</label>
        <input
          required
          maxLength={80}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded border border-line bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-gold"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-ink">{t('phone')}</label>
        <input
          required
          type="tel"
          maxLength={20}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full rounded border border-line bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-gold"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-ink">{t('message')}</label>
        <textarea
          rows={4}
          maxLength={1000}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded border border-line bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-gold"
        />
      </div>

      {fieldError && <p className="text-sm text-red-700">{fieldError}</p>}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="flex items-center gap-2 rounded bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition hover:bg-gold disabled:opacity-60"
      >
        <Send size={16} />
        {status === 'sending' ? t('sending') : t('submit')}
      </button>

      {status === 'success' && <p className="text-sm text-green-700">{t('success')}</p>}
      {status === 'error' && !fieldError && <p className="text-sm text-red-700">{t('error')}</p>}
    </form>
  );
}
