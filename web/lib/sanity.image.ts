import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

import { dataset, projectId, sanityConfigured } from "@/sanity/env";

const builder = sanityConfigured
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export function urlForImage(source: SanityImageSource | undefined) {
  if (!builder || !source) return null;
  return builder.image(source).width(900).auto("format").fit("max").url();
}
