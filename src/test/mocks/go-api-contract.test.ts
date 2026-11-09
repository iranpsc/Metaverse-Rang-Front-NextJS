import { http, HttpResponse } from 'msw';
import { describe, expect, test } from 'vitest';
import { server } from './server';

type ApiMethod = 'GET' | 'POST' | 'DELETE';

type ApiContract = {
  id: string;
  method: ApiMethod;
  path: string;
  multipart?: boolean;
};

const contracts: ApiContract[] = [
  { id: 'A1', method: 'POST', path: '/api/auth/me' },
  { id: 'A2', method: 'POST', path: '/api/auth/register' },
  { id: 'A3', method: 'GET', path: '/api/auth/redirect?redirect_to=%2Ffa' },
  { id: 'A4', method: 'POST', path: '/api/auth/referral' },
  { id: 'A5', method: 'POST', path: '/api/auth/logout' },

  { id: 'C1', method: 'GET', path: '/api/calendar?type=event&page=1' },
  { id: 'C2', method: 'GET', path: '/api/calendar/filter?start_date=2026-01-01&end_date=2026-12-31' },
  { id: 'C3', method: 'GET', path: '/api/calendar/1' },
  { id: 'C4', method: 'GET', path: '/api/calendar/events/1' },
  { id: 'C5', method: 'POST', path: '/api/calendar/events/1/interact' },

  { id: 'T1', method: 'GET', path: '/api/tutorials?page=1' },
  { id: 'T2', method: 'POST', path: '/api/tutorials/search' },
  { id: 'T3', method: 'GET', path: '/api/tutorials/categories' },
  { id: 'T4', method: 'GET', path: '/api/tutorials/categories/mock-cat' },
  { id: 'T5', method: 'GET', path: '/api/tutorials/categories/mock-cat/mock-sub' },
  { id: 'T6', method: 'GET', path: '/api/tutorials/mock-video?page=1' },
  { id: 'T7', method: 'GET', path: '/api/tutorials/1/comments?page=1' },
  { id: 'T8', method: 'POST', path: '/api/tutorials/1/comments' },
  { id: 'T9', method: 'POST', path: '/api/tutorials/1/comments/1' },
  { id: 'T10', method: 'DELETE', path: '/api/tutorials/1/comments/1' },
  { id: 'T11', method: 'POST', path: '/api/tutorials/1/comments/1/like' },
  { id: 'T12', method: 'POST', path: '/api/tutorials/1/comments/1/dislike' },
  { id: 'T13', method: 'POST', path: '/api/tutorials/1/comments/1/report' },
  { id: 'T14', method: 'POST', path: '/api/tutorials/1/comments/1/interactions?liked=1' },

  { id: 'R1', method: 'GET', path: '/api/comments/1/replies' },
  { id: 'R2', method: 'POST', path: '/api/comments/1/reply' },
  { id: 'R3', method: 'POST', path: '/api/comments/1/replies/1/interactions?liked=1' },
  { id: 'R4', method: 'DELETE', path: '/api/comments/1/replies/1' },

  { id: 'L1', method: 'GET', path: '/api/levels' },
  { id: 'L2', method: 'GET', path: '/api/levels/1' },
  { id: 'L3', method: 'GET', path: '/api/levels/1/general-info' },

  { id: 'U1', method: 'GET', path: '/api/users?page=1' },
  { id: 'U2', method: 'POST', path: '/api/search/users', multipart: true },
  { id: 'U3', method: 'GET', path: '/api/citizen/100' },
  { id: 'U4', method: 'GET', path: '/api/citizen/100/referrals?page=1&search=' },
  { id: 'U5', method: 'GET', path: '/api/citizen/100/referrals/chart?range=year' },
  { id: 'U6', method: 'GET', path: '/api/citizen/100/features/summary?period=year&karbari=blue' },
  { id: 'U7', method: 'GET', path: '/api/citizen/100/features/chart?period=year&karbari=blue' },
  { id: 'U8', method: 'GET', path: '/api/citizen/100/features?karbari=blue&page=1&per_page=10' },
  { id: 'U9', method: 'GET', path: '/api/citizen/100/buildings?karbari%5B%5D=blue&page=1' },
  { id: 'U10', method: 'GET', path: '/api/citizen/100/buildings/summary' },
  { id: 'U11', method: 'GET', path: '/api/citizen/100/buildings/chart?period=year&karbari%5B%5D=blue' },
  { id: 'U12', method: 'GET', path: '/api/citizen/100/wallet/history/summary?period=year&assets=blue' },
  { id: 'U13', method: 'GET', path: '/api/citizen/100/wallet/history/chart?period=year&assets=blue' },
];

const apiOrigin = 'http://metarang-api.test';

function makeRequestBody(contract: ApiContract): BodyInit | undefined {
  if (contract.method === 'GET' || contract.method === 'DELETE') return undefined;

  if (contract.multipart) {
    const form = new FormData();
    form.set('searchTerm', 'mock citizen');
    return form;
  }

  return JSON.stringify({ content: 'Mock contract payload', referral: 'MOCK', back_url: '/fa' });
}

async function requestContract(contract: ApiContract): Promise<Response> {
  const headers: Record<string, string> = { Authorization: 'Bearer mock-test-token' };
  if (!contract.multipart && contract.method !== 'GET' && contract.method !== 'DELETE') {
    headers['Content-Type'] = 'application/json';
  }

  return fetch(new URL(contract.path, apiOrigin), {
    method: contract.method,
    headers,
    body: makeRequestBody(contract),
  });
}

describe('Go backend MSW contract coverage', () => {
  test('the contract inventory contains all 44 documented Go endpoints', () => {
    expect(contracts).toHaveLength(44);
    expect(new Set(contracts.map(({ id }) => id)).size).toBe(44);
  });

  test.each(contracts)('$id $method $path returns a successful JSON response', async (contract) => {
    const response = await requestContract(contract);

    expect(response.status, `${contract.id} should be handled by a local MSW fixture`).toBeGreaterThanOrEqual(200);
    expect(response.status, `${contract.id} should return a successful status`).toBeLessThan(300);
    expect(response.headers.get('content-type') || '').toContain('application/json');
    await expect(response.json()).resolves.toBeTruthy();
  });

  test.each(contracts)('$id $method $path can exercise a backend failure response', async (contract) => {
    const url = new URL(contract.path, apiOrigin).pathname;
    server.use(
      http.all(url, () =>
        HttpResponse.json(
          { message: 'Deterministic mock backend failure', code: 'MOCK_FAILURE', endpoint: contract.id },
          { status: 503 },
        ),
      ),
    );

    const response = await requestContract(contract);
    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({
      code: 'MOCK_FAILURE',
      endpoint: contract.id,
    });
  });
});
