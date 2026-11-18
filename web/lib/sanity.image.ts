import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

import { dataset, projectId, sanityConfigured } from "@/sanity/env";

const builder = sanityConfigured
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export function urlForImage(
  source: SanityImageSource | undefined,
  width = 1600,
) {
  if (!builder || !source) return null;
  return builder.image(source).width(width).auto("format").fit("max").url();
}
