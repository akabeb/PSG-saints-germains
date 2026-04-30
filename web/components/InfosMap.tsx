"use client";

/**
 * Carte OpenStreetMap (tuiles standard via osm.org) — embed iframe sans JS lourd.
 * Reproduit le comportement du plugin OSM du site WP.
 */
export function InfosMap({ lat, lng }: { lat: number; lng: number }) {
  const delta = 0.004;
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
  return (
    <div className="h-[450px] w-full">
      <iframe
        src={src}
        title="Plan OpenStreetMap"
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
