"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reproduit `.eltdf-section-title-holder.eltdf-st-decor-animation` du thème Laurent.
 *
 * Structure DOM (tirée du live) :
 *   <span class="eltdf-st-tagline">  ← Miniver, gold #c9ab81, 19px
 *   <div class="eltdf-st-title-holder">  ← inline-flex
 *     <div class="decor first-of-type">[svg zigzag]</div>   ← left: -30px
 *     <h3 class="eltdf-st-title">Title</h3>                  ← Voltaire 36px / 0.23em
 *     <div class="decor last-of-type">[svg zigzag]</div>     ← right: -20px, rotate(180deg)
 *   </div>
 *   <p class="eltdf-st-text">subtitle</p>  ← margin-top: 19px
 *
 * Les paths des décor s'animent quand la section apparaît en viewport (stroke-dasharray:57 → 0).
 */
type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  level?: "h2" | "h3";
  className?: string;
};

function DecorSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="41.125" height="9.146" aria-hidden>
      <path fill="none" stroke="currentColor" strokeMiterlimit={10} d="M40.881 8.576L20.562.591.244 8.576" />
      <path fill="none" stroke="currentColor" strokeMiterlimit={10} d="M40.881.591L20.562 8.576.243.591" />
    </svg>
  );
}

export function SectionTitle({ id, eyebrow, title, subtitle, level = "h2", className = "" }: Props) {
  const Heading = level;
  const ref = useRef<HTMLDivElement | null>(null);
  const [appear, setAppear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || appear) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setAppear(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [appear]);

  return (
    <div
      ref={ref}
      className={`section-title-holder ${appear ? "appear" : ""} ${className}`.trim()}
    >
      {eyebrow ? <span className="st-tagline">{eyebrow}</span> : null}
      <div className="st-title-holder">
        <span className="decor decor-first">
          <DecorSvg />
        </span>
        <Heading id={id} className="st-title">{title}</Heading>
        <span className="decor decor-last">
          <DecorSvg />
        </span>
      </div>
      {subtitle ? <p className="st-text">{subtitle}</p> : null}
    </div>
  );
}
