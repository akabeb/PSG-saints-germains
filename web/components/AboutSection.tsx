import Image from "next/image";

import { ChevronGridAnimated } from "@/components/ChevronGridAnimated";
import { LaurentContainer } from "@/components/LaurentContainer";
import { SectionTitle } from "@/components/SectionTitle";
import type { Locale } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/getSiteSettings";
import { urlForImage } from "@/lib/sanity.image";
import { CHEVRON_PATTERN_TALL_SVG } from "@/lib/svg-assets";

const FALLBACK_LEFT = "/assets/COMPTOIR-OUR-STORY.jpg";
const FALLBACK_RIGHT = "/assets/COMPTOIR-PRESSION.jpg";

export async function AboutSection({ locale }: Readonly<{ locale: Locale }>) {
  const settings = await getSiteSettings(locale);
  const leftSrc = settings.aboutImageLeft
    ? (urlForImage(settings.aboutImageLeft) ?? FALLBACK_LEFT)
    : FALLBACK_LEFT;
  const rightSrc = settings.aboutImageRight
    ? (urlForImage(settings.aboutImageRight) ?? FALLBACK_RIGHT)
    : FALLBACK_RIGHT;

  return (
    <section className="bg-wp-surface py-[70px]">
      <LaurentContainer>
        <div className="text-center">
          <SectionTitle
            eyebrow={settings.aboutEyebrow}
            title={settings.aboutTitle}
            subtitle={settings.aboutText}
            level="h3"
          />
        </div>

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-10">
          <div className="relative overflow-hidden">
            <Image
              src={leftSrc}
              alt={`${settings.name} — Notre histoire`}
              width={778}
              height={1182}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 480px"
              className="h-auto w-full object-cover"
            />
          </div>
          <div className="hidden self-center md:block">
            <ChevronGridAnimated
              markup={CHEVRON_PATTERN_TALL_SVG}
              width={290}
              height={548}
            />
          </div>
          <div className="relative overflow-hidden">
            <Image
              src={rightSrc}
              alt={`${settings.name} — Ambiance`}
              width={778}
              height={1182}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 480px"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </LaurentContainer>
    </section>
  );
}
