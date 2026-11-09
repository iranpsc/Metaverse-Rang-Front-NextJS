import { describe, expect, it } from 'vitest';
import {
  discoverDictionaryFileCodes,
  readLocalEnvContent,
  resolveConfiguredLanguageCodes,
  resolveDictionary,
  resolveLanguageName,
} from './handlers';

describe('MSW API fixtures', () => {
  it('covers environment language precedence and the default locale fallback', () => {
    expect(resolveConfiguredLanguageCodes('de,es', 'fa,en')).toEqual(['de', 'es']);
    expect(resolveConfiguredLanguageCodes('', 'fa,en')).toEqual(['fa', 'en']);
    expect(resolveConfiguredLanguageCodes('', '')).toEqual(['fa', 'en', 'ar', 'ru', 'zh']);
  });

  it('uses configured names and falls back to the locale code for unknown names', () => {
    expect(resolveLanguageName('fa')).toBe('فارسی');
    expect(resolveLanguageName('de')).toBe('de');
  });

  it('uses a locale dictionary when available and the shared fixture otherwise', () => {
    expect(resolveDictionary('fa')).toHaveProperty('1457', 'متاورس رنگ');
    expect(resolveDictionary('de')).toHaveProperty('1457', 'Metaverse Rang');
  });

  it('defaults pagination to the first page when the page query is omitted', async () => {
    const response = await fetch('https://dev-api.metarang.com/api/citizen/hm-123/buildings');
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      meta: { current_page: 1, last_page: 1 },
    });
  });

  it('discovers configured active locales and serves dictionaries through one generic route', async () => {
    const response = await fetch('https://dev-admin.metarang.com/api/translations?active=true');
    expect(response.status).toBe(200);
    const body = await response.json();
    const languageCodes = body.data.map((language: { code: string }) => language.code);
    expect(languageCodes).toEqual(expect.arrayContaining(['fa', 'en', 'ar', 'ru', 'zh']));
    expect(new Set(languageCodes).size).toBe(languageCodes.length);

    for (const code of languageCodes) {
      const language = body.data.find((item: { code: string }) => item.code === code);
      expect(language.file_url).toBe(`https://rgb.irpsc.com/lang/${code}.json`);
      expect(language.direction).toBe(['fa', 'ar', 'he', 'ps', 'ur'].includes(code.split('-')[0]) ? 'rtl' : 'ltr');
      const dictionaryResponse = await fetch(language.file_url);
      expect(dictionaryResponse.status, `dictionary for ${code}`).toBe(200);
      await expect(dictionaryResponse.json()).resolves.toHaveProperty('1457');
    }
  });

  it('serves future locale dictionaries without adding a locale-specific handler', async () => {
    const response = await fetch('https://rgb.irpsc.com/lang/zh.json');
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ 1457: 'Metaverse Rang' });
  });

  it('rejects dictionaries for locales that are not active', async () => {
    const response = await fetch('https://rgb.irpsc.com/lang/zz-inactive.json');
    expect(response.status).toBe(404);
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

  it('uses safe empty fallbacks when local environment or locale directory cannot be read', () => {
    expect(readLocalEnvContent(() => { throw new Error('missing env'); })).toBe('');
    expect(discoverDictionaryFileCodes(() => { throw new Error('missing locale directory'); })).toEqual([]);
  });

  it('covers the calendar filter mock endpoint', async () => {
    const response = await fetch('https://dev-api.metarang.com/api/calendar/filter');
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      data: [{ id: 401, title: 'Filtered mock event' }],
    });
  });

  it('returns a controlled error for an invalid translations query', async () => {
    const response = await fetch(
      'https://dev-admin.metarang.com/api/translations?active=false',
    );

    expect(response.status).toBe(400);
  });
});
