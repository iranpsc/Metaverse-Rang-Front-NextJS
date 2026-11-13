import { defineConfig } from "@playwright/test";
import baseConfig from "./playwright.config";

// Keep the test-runner metadata/dictionary checks and the Next.js server on
// exactly the same Admin translation origin.
const translationAdminApiURL = (
  process.env.PLAYWRIGHT_TRANSLATION_API_URL || "https://admin.metarang.com"
).replace(/\/+$/, "");
process.env.PLAYWRIGHT_TRANSLATION_API_URL = translationAdminApiURL;

// SEO and crawl runs use the real Admin translation service while every
// application API continues to use the local mock server. This value must also
// be present during "next build", because localized routes may be prerendered.
const webServers = Array.isArray(baseConfig.webServer)
  ? baseConfig.webServer
  : baseConfig.webServer
    ? [baseConfig.webServer]
    : [];

const translationWebServers = webServers.map((server) => {
  if (!server.command.includes("npm run start")) return server;

  return {
    ...server,
    env: {
      ...server.env,
      TRANSLATION_ADMIN_API_BASE_URL: translationAdminApiURL,
    },
  };
});

export default defineConfig({
  ...baseConfig,
  webServer: translationWebServers,
});
