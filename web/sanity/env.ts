export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "z0nk1sgq";

/** Organisation Sanity (CLI, déploiements) — voir https://www.sanity.io/manage */
export const organizationId =
  process.env.SANITY_ORGANIZATION_ID?.trim() || "";

export const sanityConfigured = Boolean(projectId);
