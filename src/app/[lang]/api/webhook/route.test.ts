import { afterEach, describe, expect, it, vi } from 'vitest';
import type { NextRequest } from 'next/server';
import { POST } from './route';

const makeRequest = (body: string, secret?: string) =>
  new Request('http://localhost/fa/api/webhook', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(secret ? { 'x-webhook-secret': secret } : {}),
    },
    body,
  }) as NextRequest;

describe('POST /api/webhook', () => {
  afterEach(() => vi.unstubAllEnvs());

  it('rejects requests without the configured webhook secret', async () => {
    vi.stubEnv('WEBHOOK_SECRET', 'test-webhook-secret');

    const response = await POST(makeRequest(JSON.stringify({ event: 'updated' })));

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toMatchObject({ success: false });
  });

  it('accepts a valid secret and JSON payload', async () => {
    vi.stubEnv('WEBHOOK_SECRET', 'test-webhook-secret');

    const response = await POST(
      makeRequest(JSON.stringify({ event: 'updated' }), 'test-webhook-secret'),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ success: true });
  });

  it('returns 400 for malformed JSON after authenticating the request', async () => {
    vi.stubEnv('WEBHOOK_SECRET', 'test-webhook-secret');

    const response = await POST(makeRequest('{invalid-json', 'test-webhook-secret'));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({ success: false });
  });

  it('rejects requests when no webhook secret is configured', async () => {
    vi.stubEnv('WEBHOOK_SECRET', '');

    const response = await POST(makeRequest('{}', ''));

    expect(response.status).toBe(401);
  });
});
