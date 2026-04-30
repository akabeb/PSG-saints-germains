import Link from "next/link";

import { LogoSvg } from "@/components/LogoSvg";

export default function RootNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-wp-panel px-6 text-center">
      <Link
        href="/fr"
        className="mb-10 text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wp-gold"
        aria-label="Le Comptoir des Saints-Pères"
      >
        <LogoSvg className="h-[39px] w-[100px]" fill="currentColor" />
      </Link>
      <p className="font-heading text-[12px] uppercase tracking-[0.3em] text-wp-gold">404</p>
      <h1 className="mt-4 font-heading text-[28px] font-normal uppercase tracking-[0.22em] text-white sm:text-[36px]">
        Page introuvable
      </h1>
      <p className="mt-3 font-body text-[15px] tracking-wide text-white/50">Page not found</p>
      <Link
        href="/fr"
        className="mt-10 border border-wp-ornament px-8 py-3 font-cta text-[12px] uppercase tracking-[0.36em] text-white/80 transition hover:bg-wp-ornament/15 hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-gold"
      >
        Revenir à l&apos;accueil
      </Link>
    </div>
  );
}
