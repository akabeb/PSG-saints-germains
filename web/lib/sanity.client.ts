import { createClient, type SanityClient } from "next-sanity";

import { apiVersion, dataset, projectId, sanityConfigured } from "@/sanity/env";

const readToken = process.env.SANITY_API_READ_TOKEN?.trim();

function buildClient(): SanityClient | null {
  if (!sanityConfigured) return null;
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: !readToken,
    token: readToken || undefined,
  });
}

export const sanityClient = buildClient();
