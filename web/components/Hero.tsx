import Image from "next/image";

import { TitleDecor } from "@/components/TitleDecor";
import type { Locale } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/getSiteSettings";
import { urlForImage } from "@/lib/sanity.image";

const fallbackHero =
  process.env.NEXT_PUBLIC_HERO_IMAGE?.trim() || "/assets/hero-cover.jpg";

export async function Hero({ locale }: Readonly<{ locale: Locale }>) {
  const settings = await getSiteSettings(locale);
  const heroSrc = settings.heroImage
    ? (urlForImage(settings.heroImage) ?? fallbackHero)
    : fallbackHero;
  const title = settings.heroTitle?.trim() || settings.name;

  return (
    <section
      className="relative w-full overflow-hidden bg-wp-panel min-h-[500px] md:min-h-[700px]"
    >
      <Image
        src={heroSrc}
        alt={`${settings.name} — photo d'ambiance`}
        fill
        priority
        fetchPriority="high"
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
        <div className="inline-flex items-center justify-center gap-x-[3em] md:gap-x-[3.5em]">
          <TitleDecor />
          <h1
            className="m-0 font-heading text-[28px] font-normal uppercase leading-[1.27] tracking-[0.22em] text-white sm:text-[36px] md:text-[48px]"
            style={{ paddingLeft: "0.52em", paddingRight: "0.37em" }}
          >
            {title}
          </h1>
          <TitleDecor />
        </div>
        <p className="mx-auto mt-[10px] max-w-3xl font-body text-[16px] font-normal leading-[29px] tracking-[1px] text-white">
          {settings.welcome}
        </p>
      </div>
    </section>
  );
}
