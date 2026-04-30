import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "z0nk1sgq",
    dataset: "production",
  },
  deployment: {
    appId: "gneqbtl5hvw2l05mecfdro16",
  },
  vite: {
    css: {
      postcss: { plugins: [] },
    },
  },
});
