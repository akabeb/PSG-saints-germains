import { ChevronGridAnimated } from "@/components/ChevronGridAnimated";
import { LaurentContainer } from "@/components/LaurentContainer";
import { MenuAccordion } from "@/components/MenuAccordion";
import { SectionTitle } from "@/components/SectionTitle";
import type { Locale } from "@/lib/i18n";
import { getMenu } from "@/lib/getMenu";
import { getSiteSettings } from "@/lib/getSiteSettings";
import { CHEVRON_GRID_SVG } from "@/lib/svg-assets";

export async function MenuSection({ locale }: Readonly<{ locale: Locale }>) {
  const [categories, settings] = await Promise.all([
    getMenu(locale),
    getSiteSettings(locale),
  ]);

  return (
    <section className="relative overflow-hidden bg-wp-surface py-[70px]">
      <div
        className="pointer-events-none absolute top-1/2 z-[1] hidden md:block"
        style={{ left: "-220px", transform: "translateY(calc(-50% - 60px))" }}
      >
        <ChevronGridAnimated markup={CHEVRON_GRID_SVG} width={378} height={377} />
      </div>
      <LaurentContainer>
        <div className="relative z-[2]">
          {(settings.menuEyebrow || settings.menuTitle) && (
            <div className="mb-10 text-center">
              <SectionTitle
                eyebrow={settings.menuEyebrow || undefined}
                title={settings.menuTitle}
              />
            </div>
          )}
          <MenuAccordion categories={categories} />
        </div>
      </LaurentContainer>
    </section>
  );
}
