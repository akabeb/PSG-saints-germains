import Image from "next/image";

import { TitleDecor } from "@/components/TitleDecor";
import { dict, type Locale } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/getSiteSettings";
import { urlForImage } from "@/lib/sanity.image";

const FALLBACK_HERO =
  process.env.NEXT_PUBLIC_HERO_IMAGE?.trim() || "/assets/hero-cover.jpg";

export async function PageHero({
  title,
  locale,
}: Readonly<{ title: string; locale: Locale }>) {
  const settings = await getSiteSettings(locale);
  const t = dict[locale];
  const src = settings.heroImage
    ? (urlForImage(settings.heroImage, 2000) ?? FALLBACK_HERO)
    : FALLBACK_HERO;

  return (
    <section className="relative flex min-h-[320px] w-full items-center justify-center overflow-hidden bg-wp-panel pt-24 pb-12 md:min-h-[440px] md:pt-28">
      <Image
        src={src}
        alt={t.aria.heroImageAlt}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-wp-panel/75 via-wp-panel/55 to-wp-panel/75"
      />
      <div className="relative z-10 flex flex-col items-center justify-center px-5 text-center">
        <TitleDecor className="mb-4" />
        <h1 className="font-heading text-[26px] font-normal uppercase leading-[1.27] tracking-[0.18em] text-white sm:text-[36px] md:text-[46px]">
          {title}
        </h1>
        <TitleDecor className="mt-4" />
      </div>
    </section>
  );
}
