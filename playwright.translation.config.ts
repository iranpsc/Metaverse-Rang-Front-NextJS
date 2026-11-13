import { defineConfig } from "@playwright/test";
import baseConfig from "./playwright.config";

// SEO and crawl runs use the real Admin translation service while every
// application API continues to use the local mock server.
const webServers = Array.isArray(baseConfig.webServer)
  ? baseConfig.webServer
  : baseConfig.webServer
    ? [baseConfig.webServer]
    : [];

const translationWebServers = webServers.map((server) => {
  const config = server as { command?: string; env?: Record<string, string> };
  if (!config.command?.includes("npm run start")) return server;

  return {
    ...config,
    env: {
      ...config.env,
      TRANSLATION_ADMIN_API_BASE_URL: "https://admin.metarang.com",
    },
  };
});

export default defineConfig({
  ...baseConfig,
  webServer: translationWebServers,
});
