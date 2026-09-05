'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type FaqItem = { q: string; a: string };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-t border-b border-line">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-6 text-start"
            >
              <span className="font-medium text-ink">{item.q}</span>
              <ChevronDown
                className={`shrink-0 text-gold transition-transform ${isOpen ? 'rotate-180' : ''}`}
                size={20}
              />
            </button>
            {isOpen && <p className="pb-6 text-sm leading-relaxed text-ink-700">{item.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
