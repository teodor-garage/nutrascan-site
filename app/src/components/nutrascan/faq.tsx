import { useId, useState } from "react";
import { StructuredData } from "../StructuredData";

export type FaqItem = { q: string; a: string };

export function faqJsonLd(items: FaqItem[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  });
}

export function Faq({ items, title = "Questions fréquentes" }: { items: FaqItem[]; title?: string }) {
  return (
    <section aria-labelledby="faq-heading">
      <StructuredData json={faqJsonLd(items)} />
      <h2 id="faq-heading" className="text-3xl font-bold tracking-tight text-[#14181C] sm:text-4xl">
        {title}
      </h2>
      <div className="mt-8 divide-y divide-[#14181C]/10 border-t border-[#14181C]/10">
        {items.map((item) => (
          <FaqRow key={item.q} item={item} />
        ))}
      </div>
    </section>
  );
}

function FaqRow({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="py-5">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 text-left"
      >
        <span className="text-lg font-medium text-[#14181C]">{item.q}</span>
        <span
          aria-hidden="true"
          className={`shrink-0 text-2xl font-light text-[#2E6B82] transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      <div
        id={panelId}
        className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="min-h-0">
          <p className="max-w-2xl pt-3 leading-relaxed text-[#5B6670]">{item.a}</p>
        </div>
      </div>
    </div>
  );
}
