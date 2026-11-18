import { ChevronGridAnimated } from "@/components/ChevronGridAnimated";
import { LaurentContainer } from "@/components/LaurentContainer";
import { MenuAccordion } from "@/components/MenuAccordion";
import { SectionTitle } from "@/components/SectionTitle";
import { geoContent } from "@/lib/geo-content";
import { dict, type Locale } from "@/lib/i18n";
import { getMenu } from "@/lib/getMenu";
import { getSiteSettings } from "@/lib/getSiteSettings";
import { CHEVRON_GRID_SVG } from "@/lib/svg-assets";

export async function MenuSection({
  locale,
  hideSectionHeading = false,
  leadText,
}: Readonly<{ locale: Locale; hideSectionHeading?: boolean; leadText?: string }>) {
  const [categories, settings] = await Promise.all([
    getMenu(locale),
    getSiteSettings(locale),
  ]);
  const t = dict[locale];

  return (
    <section
      id="la-carte"
      className="relative scroll-mt-20 overflow-x-clip bg-wp-surface py-[70px]"
    >
      <div
        className="pointer-events-none absolute top-1/2 z-[1] hidden md:block"
        style={{ left: "-220px", transform: "translateY(calc(-50% - 60px))" }}
      >
        <ChevronGridAnimated markup={CHEVRON_GRID_SVG} width={378} height={377} />
      </div>
      <LaurentContainer>
        <div className="relative z-[2]">
          {!hideSectionHeading && (settings.menuEyebrow || settings.menuTitle) && (
            <div className="mb-10 text-center">
              <SectionTitle
                id="titre-la-carte"
                eyebrow={settings.menuEyebrow || undefined}
                title={settings.menuTitle}
              />
            </div>
          )}

          {leadText ? (
            <p className="geo-summary mx-auto mb-10 max-w-3xl text-center font-body text-[15.5px] leading-[1.8] tracking-[0.3px] text-wp-ink/85">
              {leadText}
            </p>
          ) : null}

          <MenuAccordion
            categories={categories}
            categoryLeads={geoContent[locale].categoryLeads}
            labels={{
              foodSeparator: t.menu.foodSeparator,
              drinksSeparator: t.menu.drinksSeparator,
              expandAll: t.menu.expandAll,
              collapseAll: t.menu.collapseAll,
              allergensLabel: t.menu.allergensLabel,
            }}
          />

          {/* Mentions réglementaires obligatoires CHR (prix TTC service compris, allergènes INCO, origine viandes, Loi Évin) */}
          <div className="mt-12 border-t border-wp-field-border/30 pt-6 text-center">
            <p className="mx-auto max-w-3xl font-body text-[13px] leading-relaxed text-wp-ink/75">
              {t.menu.legalPricing}
            </p>
            <p className="mx-auto mt-1.5 max-w-3xl font-body text-[13px] leading-relaxed text-wp-ink/70">
              {t.menu.legalMeatAndAlcohol}
            </p>
          </div>
        </div>
      </LaurentContainer>
    </section>
  );
}
