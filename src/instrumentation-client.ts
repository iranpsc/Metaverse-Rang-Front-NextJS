// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Replay used to be registered here synchronously, which meant its
  // ~265KB module was downloaded and parsed on every single page load
  // for 100% of visitors — even though replaysSessionSampleRate is only
  // 0.02 in production (98% of sessions never use it). It's now added
  // after the page goes idle instead (see below), which takes it off
  // the initial/critical bundle entirely without losing coverage: it's
  // still active for effectively the whole session, so
  // replaysOnErrorSampleRate still catches errors normally.
  integrations: [],

  // Keep production sampling low — 100% traces + replay is a large JS/network cost.
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1 : 0.1,

  enableLogs: true,

  replaysSessionSampleRate: process.env.NODE_ENV === "development" ? 0.1 : 0.02,

  replaysOnErrorSampleRate: 1.0,

  sendDefaultPii: true,
});

// Lazy-load Session Replay once the browser is idle (or after a short
// fallback delay), instead of bundling it into the initial page load.
// This is Sentry's own documented pattern for exactly this problem:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/session-replay/#lazy-loading-replay
if (typeof window !== "undefined") {
  const loadReplay = () => {
    Sentry.lazyLoadIntegration("replayIntegration")
      .then((replayIntegration) => {
        Sentry.addIntegration(replayIntegration());
      })
      .catch((error) => {
        // e.g. network hiccup fetching the lazy chunk — non-fatal,
        // just means Replay won't be active for this session.
        console.error("Sentry Replay failed to lazy-load:", error);
      });
  };

  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(loadReplay, { timeout: 4000 });
  } else {
    setTimeout(loadReplay, 2000);
  }
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
