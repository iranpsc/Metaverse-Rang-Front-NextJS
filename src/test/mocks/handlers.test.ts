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

  it('returns a controlled error for an invalid translations query', async () => {
    const response = await fetch(
      'https://dev-admin.metarang.com/api/translations?active=false',
    );

    expect(response.status).toBe(400);
  });
});
