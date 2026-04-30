import Image from "next/image";

import { TitleDecor } from "@/components/TitleDecor";
import type { Locale } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/getSiteSettings";
import { urlForImage } from "@/lib/sanity.image";

const FALLBACK_HERO =
  process.env.NEXT_PUBLIC_HERO_IMAGE?.trim() || "/assets/hero-cover.jpg";

export async function PageHero({
  title,
  locale,
}: Readonly<{ title: string; locale: Locale }>) {
  const settings = await getSiteSettings(locale);
  const src = settings.heroImage
    ? (urlForImage(settings.heroImage) ?? FALLBACK_HERO)
    : FALLBACK_HERO;

  return (
    <section className="relative w-full overflow-hidden bg-wp-panel min-h-[500px] md:min-h-[700px]">
      <Image src={src} alt={title} fill priority className="object-cover object-center" sizes="100vw" />
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center min-h-[400px] pt-[110px] md:min-h-[590px]"
      >
        <TitleDecor className="mb-4" />
        <h1 className="font-heading text-[28px] font-normal uppercase leading-[1.27] tracking-[0.22em] text-white sm:text-[36px] md:text-[48px]">
          {title}
        </h1>
        <TitleDecor className="mt-4" />
      </div>
    </section>
  );
}
