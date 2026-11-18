import type { Metadata } from "next";

import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Administration Sanity | ${site.name}`,
  robots: { index: false, follow: false },
};

export default function StudioInfoPage() {
  return (
    <main className="min-h-screen bg-wp-surface px-6 pb-24 pt-28">
      <div className="mx-auto max-w-xl font-body text-[15px] leading-relaxed text-wp-ink/90">
        <h1 className="font-heading text-[30px] font-normal uppercase tracking-[0.18em] text-wp-accent">
          Administration du contenu (Sanity)
        </h1>
        <p className="mt-5">
          Pour permettre à l&apos;équipe du restaurant de modifier la carte et les
          horaires depuis n&apos;importe quel navigateur (ordinateur, tablette ou
          téléphone) sans terminal, publiez le Studio hébergé Sanity une seule fois :
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xs border border-wp-field-border/40 bg-wp-warm p-4 font-mono text-[13px] text-wp-ink">
          cd web &amp;&amp; npx sanity deploy
        </pre>
        <p className="mt-5">
          Pour travailler sur le Studio en développement local (port 3333) :
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xs border border-wp-field-border/40 bg-wp-warm p-4 font-mono text-[13px] text-wp-ink">
          cd web &amp;&amp; npm run studio
        </pre>
      </div>
    </main>
  );
}
