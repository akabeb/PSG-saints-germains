"use client";

import { useRef, useState } from "react";

import type { MenuCategoryData, MenuItem } from "@/lib/menu-fallback";

function PricingRow({
  item,
  singlePrice,
  priceColumns,
}: Readonly<{ item: MenuItem; singlePrice?: string; priceColumns?: string[] }>) {
  if (item.kind === "divider") {
    const cols = item.priceColumns ?? priceColumns;
    return (
      <div className="mb-6 mt-8 flex items-center gap-4 first:mt-0">
        <span className="shrink-0 font-heading text-[32px] font-normal uppercase tracking-[0.2em] text-wp-accent leading-none">
          {item.name}
        </span>
        {/* Double ligne — identique au pricing-leader du thème Laurent */}
        <div className="flex flex-1 flex-col gap-[5px] self-center">
          <span className="block h-px bg-wp-field-border/60" />
          <span className="block h-px bg-wp-field-border/60" />
        </div>
        {cols && cols.length > 0 && (
          <span className="shrink-0 font-heading text-[13px] uppercase tracking-[0.1em] text-wp-accent">
            {cols.join(" / ")}
          </span>
        )}
      </div>
    );
  }

  const price = item.price ?? singlePrice ?? "";
  return (
    <div className="mb-[37px]">
      {/* display: table → title (1%) | leader (98%) | price (1%) (cf. .eltdf-pricing-item du thème) */}
      <div className="table w-full">
        <div className="table-row align-baseline">
          <h6 className="m-0 table-cell w-[1%] whitespace-nowrap pr-[5px] font-heading text-[19px] font-normal uppercase tracking-[0.06em] leading-[1.52em] text-wp-accent align-baseline">
            {item.name}
          </h6>
          {price ? (
            <>
              <span className="pricing-leader table-cell w-[98%] align-baseline" />
              <span className="table-cell w-[1%] whitespace-nowrap pl-[15px] font-heading text-[19px] font-normal uppercase tracking-[0.03em] leading-[1.52em] text-wp-accent tabular-nums align-baseline">
                {price}
              </span>
            </>
          ) : null}
        </div>
      </div>
      {item.description ? (
        <p className="mt-1 font-body text-[14px] leading-relaxed tracking-wide text-wp-ink/75">
          {item.description}
        </p>
      ) : null}
    </div>
  );
}

const NAV_HEIGHT = 100; // px — fixed header + breathing room

function CategoryPanel({
  category,
  open,
  onToggle,
}: Readonly<{
  category: MenuCategoryData;
  open: boolean;
  onToggle: () => void;
}>) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  function handleToggle() {
    const opening = !open;
    onToggle();
    if (!opening) return;
    setTimeout(() => {
      if (!titleRef.current) return;
      const rect = titleRef.current.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + rect.top - NAV_HEIGHT,
        behavior: "smooth",
      });
    }, 50);
  }

  return (
    <div>
      <h5 ref={titleRef} className="m-0">
        <button
          type="button"
          onClick={handleToggle}
          aria-expanded={open}
          className="relative w-full cursor-pointer border-t border-wp-field-border py-[17px] pl-[30px] pr-0 text-left transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-wp-accent"
        >
          <span
            aria-hidden
            className="absolute left-0 top-1/2 inline-block w-[20px] -translate-y-1/2 text-center font-heading text-[20px] leading-[18px] font-normal text-wp-accent"
          >
            {open ? "–" : "+"}
          </span>
          <span className="block font-heading text-[15px] font-normal uppercase tracking-[0.16em] text-wp-accent">
            {category.title}
          </span>
        </button>
      </h5>
      <div
        className={`grid overflow-hidden transition-all duration-300 ${
          open
            ? "grid-rows-[1fr] border-t border-wp-field-border py-[21px] pb-4"
            : "grid-rows-[0fr] border-t border-transparent"
        }`}
      >
        <div className="min-h-0">
          {category.intro ? (
            <p className="mb-4 font-body text-[13px] italic tracking-wide text-wp-ink/65">
              {category.intro}
            </p>
          ) : null}
          {category.singlePrice ? (
            <p className="mb-3 font-heading text-[12px] uppercase tracking-[0.18em] text-wp-gold">
              {category.singlePrice}
            </p>
          ) : null}
          {category.items.map((item, idx) => (
            <PricingRow
              key={`${category._id}-${idx}`}
              item={item}
              singlePrice={category.singlePrice}
              priceColumns={category.priceColumns}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Layout single-column : nourriture (column=left) puis boissons (column=right).
 * Une ligne décorative sépare les deux groupes.
 * Un seul panneau ouvert à la fois sur tout le menu (comportement WP en single column).
 */
export function MenuAccordion({ categories }: Readonly<{ categories: MenuCategoryData[] }>) {
  const [openId, setOpenId] = useState<string | null>(null);
  const food = categories.filter((c) => c.column === "left");
  const drinks = categories.filter((c) => c.column === "right");

  return (
    <div className="w-full">
      {/* Section food — border-b ferme la liste comme dans WP */}
      <div className="border-b border-wp-field-border">
        {food.map((cat) => (
          <CategoryPanel
            key={cat._id}
            category={cat}
            open={openId === cat._id}
            onToggle={() => setOpenId((cur) => (cur === cat._id ? null : cat._id))}
          />
        ))}
      </div>

      {/* Séparateur food / boissons — vc-zigzag exact du thème WP */}
      <div className="my-10 flex justify-center" aria-hidden>
        <div
          style={{
            width: "60%",
            minHeight: "14px",
            background: "0 repeat-x url(\"data:image/svg+xml;utf-8,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3C%21DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%3Csvg%20width%3D%2214px%22%20height%3D%2212px%22%20viewBox%3D%220%200%2018%2015%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%3Cpolygon%20id%3D%22Combined-Shape%22%20fill%3D%22%23ebebeb%22%20points%3D%228.98762301%200%200%209.12771969%200%2014.519983%209%205.40479869%2018%2014.519983%2018%209.12771969%22%3E%3C%2Fpolygon%3E%3C%2Fsvg%3E\")",
          }}
        />
      </div>

      {/* Section boissons */}
      <div className="border-b border-wp-field-border">
        {drinks.map((cat) => (
          <CategoryPanel
            key={cat._id}
            category={cat}
            open={openId === cat._id}
            onToggle={() => setOpenId((cur) => (cur === cat._id ? null : cat._id))}
          />
        ))}
      </div>
    </div>
  );
}
