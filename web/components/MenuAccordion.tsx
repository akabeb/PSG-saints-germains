"use client";

import { useState } from "react";

import type { MenuCategoryData, MenuItem } from "@/lib/menu-fallback";

type MenuLabels = {
  foodSeparator: string;
  drinksSeparator: string;
  expandAll: string;
  collapseAll: string;
  allergensLabel: string;
};

function PricingRow({
  item,
  singlePrice,
  priceColumns,
  allergensLabel,
}: Readonly<{
  item: MenuItem;
  singlePrice?: string;
  priceColumns?: string[];
  allergensLabel: string;
}>) {
  if (item.kind === "divider") {
    const cols = item.priceColumns ?? priceColumns;
    return (
      <div className="mb-5 mt-8 flex flex-wrap items-center justify-between gap-3 first:mt-0">
        <h4 className="m-0 font-heading text-[18px] font-normal uppercase tracking-[0.16em] text-wp-gold-dark sm:text-[20px]">
          {item.name}
        </h4>
        <div
          aria-hidden="true"
          className="hidden min-w-[32px] flex-1 flex-col gap-[4px] self-center sm:flex"
        >
          <span className="block h-px bg-wp-field-border/45" />
          <span className="block h-px bg-wp-field-border/45" />
        </div>
        {cols && cols.length > 0 && (
          <span className="shrink-0 rounded-xs border border-wp-field-border/35 px-2.5 py-0.5 font-heading text-[12px] uppercase tracking-[0.1em] text-wp-accent tabular-nums">
            {cols.join(" / ")}
          </span>
        )}
      </div>
    );
  }

  const price = item.price ?? singlePrice ?? "";
  const isMultiColumnPrice = price.length > 14;

  return (
    <div className="mb-6 last:mb-2">
      <div
        className={`flex items-baseline justify-between gap-x-3 gap-y-1 ${
          isMultiColumnPrice ? "flex-wrap sm:flex-nowrap" : ""
        }`}
      >
        <span className="min-w-0 font-heading text-[16px] font-normal uppercase leading-[1.45] tracking-[0.06em] text-wp-accent break-words sm:text-[18px]">
          {item.name}
        </span>
        {price ? (
          <>
            <span
              aria-hidden="true"
              className="pricing-leader hidden min-w-[24px] flex-1 self-baseline sm:block"
            />
            <span
              className={`shrink-0 whitespace-nowrap font-heading text-[15px] font-normal uppercase leading-[1.45] tracking-[0.03em] text-wp-accent tabular-nums sm:text-[18px] ${
                isMultiColumnPrice ? "ml-auto sm:ml-0" : ""
              }`}
            >
              {price}
            </span>
          </>
        ) : null}
      </div>
      {item.description ? (
        <p className="mt-1 max-w-[68ch] font-body text-[14px] leading-relaxed tracking-[0.3px] text-wp-ink/80">
          {item.description}
        </p>
      ) : null}
      {item.allergens && item.allergens.length > 0 ? (
        <p className="mt-1 font-body text-[12px] italic text-wp-ink/65">
          {allergensLabel} : {item.allergens.join(", ")}
        </p>
      ) : null}
    </div>
  );
}

function CategoryPanel({
  category,
  open,
  onToggle,
  allergensLabel,
}: Readonly<{
  category: MenuCategoryData;
  open: boolean;
  onToggle: () => void;
  allergensLabel: string;
}>) {
  const panelId = `menu-panel-${category._id}`;
  const btnId = `menu-btn-${category._id}`;

  return (
    <div>
      <h3 className="m-0 text-[16px] leading-normal tracking-normal">
        <button
          id={btnId}
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="group relative flex min-h-[54px] w-full cursor-pointer items-center border-t border-wp-field-border py-[15px] pl-[32px] pr-2 text-left transition-colors hover:bg-wp-warm/70 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-wp-accent"
        >
          <span
            aria-hidden="true"
            className="absolute left-0 top-1/2 inline-block w-[22px] -translate-y-1/2 text-center font-heading text-[20px] font-normal leading-[18px] text-wp-accent transition-transform"
          >
            {open ? "–" : "+"}
          </span>
          <span className="block font-heading text-[15px] font-normal uppercase tracking-[0.16em] text-wp-accent sm:text-[16px]">
            {category.title}
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        aria-hidden={!open}
        inert={!open}
        className={`accordion-panel grid overflow-hidden transition-all duration-300 ${
          open
            ? "visible grid-rows-[1fr] border-t border-wp-field-border/60 py-[22px] pb-4"
            : "invisible grid-rows-[0fr] border-t border-transparent"
        }`}
      >
        <div className="min-h-0">
          {category.intro ? (
            <p className="mb-4 font-body text-[14px] italic tracking-[0.3px] text-wp-ink/80">
              {category.intro}
            </p>
          ) : null}
          {category.priceColumns && category.priceColumns.length > 0 ? (
            <div className="sticky top-[74px] z-[5] mb-4 flex justify-end bg-wp-surface/95 py-1.5 backdrop-blur-xs">
              <span className="rounded-xs border border-wp-field-border/40 px-3 py-1 font-heading text-[12px] uppercase tracking-[0.12em] text-wp-accent tabular-nums">
                {category.priceColumns.join(" / ")}
              </span>
            </div>
          ) : null}
          {category.singlePrice ? (
            <p className="mb-4 font-heading text-[13px] uppercase tracking-[0.16em] text-wp-gold-dark">
              {category.singlePrice}
            </p>
          ) : null}
          {category.items.map((item, idx) => (
            <PricingRow
              key={`${category._id}-${idx}`}
              item={item}
              singlePrice={category.singlePrice}
              priceColumns={category.priceColumns}
              allergensLabel={allergensLabel}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Accordéon de carte fidèle au gabarit Laurent :
 * - Première catégorie ouverte par défaut pour donner un aperçu immédiat
 * - Ouverture multi-panneaux autorisée (comparaison Entrées / Plats / Vins sans saut de scroll)
 * - Bouton discret « Tout déplier / Tout replier »
 */
export function MenuAccordion({
  categories,
  labels,
}: Readonly<{
  categories: MenuCategoryData[];
  labels: MenuLabels;
}>) {
  const food = categories.filter((c) => c.column === "left");
  const drinks = categories.filter((c) => c.column === "right");
  const defaultOpen = food[0]?._id ?? categories[0]?._id;

  const [openIds, setOpenIds] = useState<Set<string>>(() =>
    defaultOpen ? new Set([defaultOpen]) : new Set(),
  );

  const allExpanded =
    categories.length > 0 && openIds.size === categories.length;

  function toggleCategory(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (allExpanded) {
      setOpenIds(new Set());
    } else {
      setOpenIds(new Set(categories.map((c) => c._id)));
    }
  }

  return (
    <div className="w-full">
      {/* Barre d'en-tête cuisine + bouton Tout déplier / Tout replier */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <span className="font-script text-[21px] text-wp-gold-dark">
          {labels.foodSeparator}
        </span>
        <button
          type="button"
          onClick={toggleAll}
          className="min-h-[40px] cursor-pointer border border-wp-field-border/60 px-4 py-1.5 font-cta text-[11px] uppercase tracking-[0.22em] text-wp-accent transition hover:bg-wp-accent hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wp-accent"
        >
          {allExpanded ? labels.collapseAll : labels.expandAll}
        </button>
      </div>

      {/* Section cuisine */}
      <div className="border-b border-wp-field-border">
        {food.map((cat) => (
          <CategoryPanel
            key={cat._id}
            category={cat}
            open={openIds.has(cat._id)}
            onToggle={() => toggleCategory(cat._id)}
            allergensLabel={labels.allergensLabel}
          />
        ))}
      </div>

      {/* Séparateur cuisine / boissons — zigzag visible aux couleurs laiton du thème */}
      {drinks.length > 0 && (
        <>
          <div className="mt-12 mb-5 flex flex-col items-center gap-3">
            <div
              aria-hidden="true"
              style={{
                width: "60%",
                minHeight: "14px",
                background:
                  '0 repeat-x url("data:image/svg+xml;utf-8,%3Csvg%20width%3D%2214px%22%20height%3D%2212px%22%20viewBox%3D%220%200%2018%2015%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpolygon%20fill%3D%22%239C7C57%22%20fill-opacity%3D%220.45%22%20points%3D%228.98762301%200%200%209.12771969%200%2014.519983%209%205.40479869%2018%2014.519983%2018%209.12771969%22%2F%3E%3C%2Fsvg%3E")',
              }}
            />
            <span className="self-start font-script text-[21px] text-wp-gold-dark">
              {labels.drinksSeparator}
            </span>
          </div>

          {/* Section boissons */}
          <div className="border-b border-wp-field-border">
            {drinks.map((cat) => (
              <CategoryPanel
                key={cat._id}
                category={cat}
                open={openIds.has(cat._id)}
                onToggle={() => toggleCategory(cat._id)}
                allergensLabel={labels.allergensLabel}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
