"use client";

export function ManageCookiesButton({ label }: Readonly<{ label: string }>) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("lcsp:open-consent"))}
      className="cursor-pointer py-1 font-cta text-[11px] uppercase tracking-[0.22em] text-wp-ink/80 transition hover:text-wp-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-wp-accent"
    >
      {label}
    </button>
  );
}
