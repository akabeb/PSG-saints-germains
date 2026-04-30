"use client";

import { useEffect } from "react";

/** Synchronise l'attribut lang de <html> avec la locale active côté client. */
export function HtmlLangSync({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
