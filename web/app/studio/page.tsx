import type { Metadata } from "next";

import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Sanity Studio | ${site.name}`,
  robots: { index: false, follow: false },
};

export default function StudioInfoPage() {
  return (
    <main className="min-h-screen bg-wp-surface px-6 pb-24 pt-28">
      <div className="mx-auto max-w-xl font-body text-[14px] leading-relaxed text-wp-ink/85">
        <h1 className="font-heading text-[32px] font-normal uppercase tracking-[0.2em] text-wp-accent">
          Sanity Studio
        </h1>
        <p className="mt-5">
          L’éditeur Sanity n’est pas embarqué dans Next.js (conflits de bundling
          avec React). Lancez le Studio en local depuis le dossier{" "}
          <code className="rounded border border-wp-field-border/40 bg-wp-accent/5 px-1.5 py-0.5 font-mono text-[13px] text-wp-accent">
            web
          </code>{" "}
          :
        </p>
        <pre className="mt-6 overflow-x-auto rounded border border-wp-field-border/40 bg-wp-surface p-4 font-mono text-[12px] text-wp-ink">
          npm run studio
        </pre>
        <p className="mt-5">
          Variables utiles dans{" "}
          <code className="rounded border border-wp-field-border/40 bg-wp-accent/5 px-1.5 py-0.5 font-mono text-[13px] text-wp-accent">
            .env.local
          </code>{" "}
          : <code className="font-mono text-wp-accent">NEXT_PUBLIC_SANITY_PROJECT_ID</code>,{" "}
          <code className="font-mono text-wp-accent">SANITY_ORGANIZATION_ID</code>{" "}
          (CLI), et optionnellement{" "}
          <code className="font-mono text-wp-accent">SANITY_API_READ_TOKEN</code>{" "}
          pour le fetch côté Next (ne jamais commiter ce token).
        </p>
      </div>
    </main>
  );
}
