import { beforeEach, describe, expect, it } from "vitest";
import {
  addWebhookLog,
  clearWebhookLogs,
  getWebhookLogs,
  safeWebhookHeaders,
  sanitizeWebhookPayload,
} from "./store";

describe("webhook inspector store", () => {
  beforeEach(() => clearWebhookLogs());

  it("redacts sensitive values recursively", () => {
    expect(sanitizeWebhookPayload({
      event: "created",
      token: "do-not-store",
      nested: { client_secret: "hidden", count: 2 },
    })).toEqual({
      event: "created",
      token: "[REDACTED]",
      nested: { client_secret: "[REDACTED]", count: 2 },
    });
  });

  it("only retains an allowlist of non-sensitive headers", () => {
    const headers = new Headers({
      "content-type": "application/json",
      "x-webhook-secret": "private",
      authorization: "Bearer private",
      "user-agent": "backend-test",
    });
    expect(safeWebhookHeaders(headers)).toEqual({
      "content-type": "application/json",
      "user-agent": "backend-test",
    });
  });

  it("keeps newest entries and caps the in-memory history at 150", () => {
    for (let index = 0; index < 152; index += 1) {
      addWebhookLog({
        method: "POST",
        path: "/api/webhook",
        contentType: "application/json",
        headers: {},
        request: { index },
        response: { success: true },
        status: 200,
        durationMs: 1,
      });
    }

    const entries = getWebhookLogs();
    expect(entries).toHaveLength(150);
    expect(entries[0].request).toEqual({ index: 151 });
    expect(entries[149].request).toEqual({ index: 2 });
  });

  it("clears all stored entries", () => {
    addWebhookLog({
      method: "POST",
      path: "/api/webhook",
      contentType: "application/json",
      headers: {},
      request: {},
      response: {},
      status: 200,
      durationMs: 1,
    });
    clearWebhookLogs();
    expect(getWebhookLogs()).toEqual([]);
  });
});
