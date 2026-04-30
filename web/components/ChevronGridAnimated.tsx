"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  markup: string;
  width: number;
  height: number;
  className?: string;
};

export function ChevronGridAnimated({ markup, width, height, className = "" }: Readonly<Props>) {
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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [appear]);

  return (
    <div
      ref={ref}
      className={`pattern-holder ${appear ? "appear" : ""} ${className}`}
      style={{ width, height, color: "var(--wp-ornament)" }}
      aria-hidden
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
