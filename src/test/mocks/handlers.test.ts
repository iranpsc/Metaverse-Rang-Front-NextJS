import { describe, expect, it } from 'vitest';

describe('MSW API fixtures', () => {
  it('mocks the active language list, including API-provided languages', async () => {
    const response = await fetch(
      'https://dev-admin.metarang.com/api/translations?active=true',
    );

    expect(response.status).toBe(200);

    const body = await response.json();

    expect(body.data.map((language: { code: string }) => language.code)).toEqual([
      'fa',
      'en',
      'ar',
    ]);
  });

  it('mocks the language dictionary file_url used by getMainFile', async () => {
    const response = await fetch('https://rgb.irpsc.com/lang/ar.json');

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      1457: 'ميتافيرس رنگ',
    });
  });

  it('mocks every API endpoint consumed by the dynamic citizen routes', async () => {
    const endpoints = [
      'https://dev-api.metarang.com/api/citizen/hm-123/referrals?search=&page=1',
      'https://dev-api.metarang.com/api/citizen/hm-123/referrals/chart?range=yearly',
      'https://dev-api.metarang.com/api/citizen/hm-123/features/summary?period=yearly',
      'https://dev-api.metarang.com/api/citizen/hm-123/features/chart?period=yearly',
      'https://dev-api.metarang.com/api/citizen/hm-123/buildings/summary',
      'https://dev-api.metarang.com/api/citizen/hm-123/buildings/chart?period=yearly',
      'https://dev-api.metarang.com/api/citizen/hm-123/buildings?page=1',
      'https://dev-api.metarang.com/api/citizen/hm-123/wallet/history/summary?period=yearly',
      'https://dev-api.metarang.com/api/citizen/hm-123/wallet/history/chart?period=yearly',
    ];

    for (const endpoint of endpoints) {
      const response = await fetch(endpoint);
      expect(response.status, endpoint).toBe(200);
      const payload = await response.json();
      expect(payload).toHaveProperty('data');
    }
  });

  it('returns a controlled error for an invalid translations query', async () => {
    const response = await fetch(
      'https://dev-admin.metarang.com/api/translations?active=false',
    );

    expect(response.status).toBe(400);
  });
});
