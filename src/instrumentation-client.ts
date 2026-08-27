// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  integrations: [Sentry.replayIntegration()],

  // Keep production sampling low — 100% traces + replay is a large JS/network cost.
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1 : 0.1,

  enableLogs: true,

  replaysSessionSampleRate: process.env.NODE_ENV === "development" ? 0.1 : 0.02,

  replaysOnErrorSampleRate: 1.0,

  sendDefaultPii: true,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
