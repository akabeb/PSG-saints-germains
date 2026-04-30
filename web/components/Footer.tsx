import Image from "next/image";

import { LaurentContainer } from "@/components/LaurentContainer";
import type { Locale } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/getSiteSettings";

export async function Footer({ locale }: Readonly<{ locale: Locale }>) {
  const settings = await getSiteSettings(locale);

  return (
    <footer className="bg-wp-surface pb-[144px] pt-[130px] text-center">
      <LaurentContainer>
        <Image
          src="/assets/logo.png"
          alt={settings.name}
          width={140}
          height={55}
          className="mx-auto"
        />
        <p className="mt-10 font-body text-[14px] tracking-[1px] text-wp-ink/80">
          {settings.name}
        </p>
        <p className="mt-2 font-body text-[14px] tracking-[1px] text-wp-ink/60">
          {settings.address}
        </p>
      </LaurentContainer>
    </footer>
  );
}
