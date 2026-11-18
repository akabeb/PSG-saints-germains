import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InfosMap } from "@/components/InfosMap";
import { LaurentContainer } from "@/components/LaurentContainer";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { getSiteSettings } from "@/lib/getSiteSettings";
import { dict, isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = isLocale(locale) ? locale : "fr";
  const t = dict[l];
  const settings = await getSiteSettings(l);
  return buildPageMetadata({
    locale: l,
    path: "/contact",
    title: settings.contactTitle || t.contact.pageTitle,
    description: `${settings.address} — ${settings.phone} — ${settings.email}`,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const t = dict[l];
  const settings = await getSiteSettings(l);
  const pageTitle = settings.contactTitle || t.contact.pageTitle;
  const formspreeAction = process.env.NEXT_PUBLIC_FORMSPREE_ACTION?.trim();

  return (
    <>
      <PageHero title={pageTitle} locale={l} />

      <section className="bg-wp-surface py-[70px]">
        <LaurentContainer>
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-script text-[22px] text-wp-gold-dark">
              {t.contact.walkInNote}
            </p>
            <p className="mx-auto mt-3 max-w-xl font-body text-[16px] leading-relaxed text-wp-ink/85">
              {t.contact.groupNote}
            </p>

            {/* Actions directes : Appel & E-mail */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={settings.phoneHref}
                className="inline-flex min-h-[46px] items-center justify-center border border-wp-accent bg-wp-accent px-8 py-3 font-cta text-[12px] uppercase tracking-[0.24em] text-white transition hover:bg-wp-accent/90 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-accent"
              >
                {t.contact.callCta} · {settings.phone}
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="inline-flex min-h-[46px] items-center justify-center border border-wp-field-border px-8 py-3 font-cta text-[12px] uppercase tracking-[0.24em] text-wp-accent transition hover:bg-wp-accent hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-accent"
              >
                {t.contact.emailCta}
              </a>
            </div>

            {formspreeAction ? (
              <form
                action={formspreeAction}
                method="POST"
                className="mx-auto mt-12 max-w-xl space-y-4 text-left"
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block font-heading text-[13px] uppercase tracking-[0.16em] text-wp-accent"
                  >
                    {t.contact.formName} *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="w-full border border-wp-field-border/60 bg-wp-warm/40 px-4 py-3 font-body text-[16px] text-wp-ink focus:border-wp-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block font-heading text-[13px] uppercase tracking-[0.16em] text-wp-accent"
                  >
                    {t.contact.formEmail} *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full border border-wp-field-border/60 bg-wp-warm/40 px-4 py-3 font-body text-[16px] text-wp-ink focus:border-wp-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block font-heading text-[13px] uppercase tracking-[0.16em] text-wp-accent"
                  >
                    {t.contact.formPlaceholder} *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    className="w-full border border-wp-field-border/60 bg-wp-warm/40 px-4 py-3 font-body text-[16px] text-wp-ink focus:border-wp-accent focus:outline-none"
                  />
                </div>
                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    className="min-h-[46px] cursor-pointer border border-wp-accent bg-wp-accent px-9 py-3 font-cta text-[12px] uppercase tracking-[0.24em] text-white transition hover:bg-wp-accent/90 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-accent"
                  >
                    {t.contact.formSubmit}
                  </button>
                </div>
              </form>
            ) : null}

            <div className="mt-14 grid gap-10 border-t border-wp-field-border/25 pt-12 md:grid-cols-2">
              <div>
                <h2 className="mb-4 font-heading text-[16px] font-normal uppercase tracking-[0.2em] text-wp-accent">
                  {t.contact.addressLabel}
                </h2>
                <p className="font-body text-[16px] leading-[1.9] tracking-[0.5px] text-wp-ink/90">
                  <a
                    href={settings.addressUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-wp-field-border/50 underline-offset-4 transition-colors hover:text-wp-accent"
                  >
                    {settings.address}
                  </a>
                </p>
                <p className="mt-3 font-body text-[16px] leading-[1.9] tracking-[0.5px] text-wp-ink/90">
                  <a
                    href={settings.phoneHref}
                    className="font-bold text-wp-accent transition-opacity hover:opacity-80"
                  >
                    {settings.phone}
                  </a>
                  <br />
                  <a
                    href={`mailto:${settings.email}`}
                    className="underline decoration-wp-field-border/40 underline-offset-4 transition-colors hover:text-wp-accent"
                  >
                    {settings.email}
                  </a>
                </p>
              </div>

              <div>
                <h2 className="mb-4 font-heading text-[16px] font-normal uppercase tracking-[0.2em] text-wp-accent">
                  {t.contact.hoursLabel}
                </h2>
                {(settings.hoursLines as string[]).map((line, i) => (
                  <p
                    key={i}
                    className="font-body text-[16px] leading-[1.9] tracking-[0.5px] text-wp-ink/90"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {settings.instagramUrl && (
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex min-h-[46px] items-center justify-center border border-wp-field-border px-9 py-3 font-cta text-[12px] uppercase tracking-[0.24em] text-wp-accent transition hover:bg-wp-accent hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-accent"
              >
                {settings.contactCtaLabel}
              </a>
            )}
          </div>
        </LaurentContainer>
      </section>

      <section className="bg-wp-surface pb-[70px]">
        <LaurentContainer>
          <div className="mx-auto max-w-3xl">
            <SectionTitle
              title={settings.directionsTitle}
              subtitle={settings.directionsText}
            />
            <p className="mt-6 text-center font-body text-[16px] leading-[1.75] tracking-[0.5px] text-wp-ink/85">
              {settings.directionsMetro}
            </p>
          </div>
        </LaurentContainer>
      </section>

      <InfosMap
        lat={settings.mapLat}
        lng={settings.mapLng}
        locale={l}
        addressUrl={settings.addressUrl}
      />
    </>
  );
}
