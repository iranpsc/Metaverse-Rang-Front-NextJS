import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { getLangArray, getTranslation, getMainFile } from './actions';
import { server } from '../../test/mocks/server';

const ADMIN_API_URL = 'https://dev-admin.metarang.com';
const DICTIONARY_URL = 'https://rgb.irpsc.com/lang/ar.json';

describe('translation data actions', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_ADMIN_API_BASE_URL', ADMIN_API_URL);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('returns the active language list from the admin API', async () => {
    const languages = await getLangArray();

    expect(languages.map((language: { code: string }) => language.code)).toEqual(['fa', 'en', 'ar']);
  });

  it('returns an empty list when the language endpoint responds with an HTTP error', async () => {
    server.use(
      http.get(`${ADMIN_API_URL}/api/translations`, () =>
        HttpResponse.json({ message: 'Unavailable' }, { status: 503 }),
      ),
    );

    await expect(getLangArray()).resolves.toEqual([]);
  });

  it('selects the requested language from the API response', async () => {
    await expect(getTranslation('ar')).resolves.toMatchObject({
      code: 'ar',
      direction: 'rtl',
      file_url: DICTIONARY_URL,
    });
  });

  it('falls back to Persian when the requested language is not available', async () => {
    await expect(getTranslation('de')).resolves.toMatchObject({
      code: 'fa',
      direction: 'rtl',
    });
  });

  it('loads the selected language dictionary', async () => {
    const dictionary = await getMainFile({
      code: 'ar',
      file_url: DICTIONARY_URL,
    });

    expect(dictionary).toMatchObject({ 1457: 'ميتافيرس رنگ' });
  });

  it('returns null when the language dictionary cannot be fetched', async () => {
    server.use(
      http.get(DICTIONARY_URL, () =>
        HttpResponse.json({ message: 'Unavailable' }, { status: 503 }),
      ),
    );

    await expect(
      getMainFile({ code: 'ar', file_url: DICTIONARY_URL }),
    ).resolves.toBeNull();
  });

  it('rejects a non-dictionary translation payload', async () => {
    server.use(
      http.get(DICTIONARY_URL, () => HttpResponse.json(['not', 'a', 'dictionary'])),
    );

    await expect(
      getMainFile({ code: 'ar', file_url: DICTIONARY_URL }),
    ).resolves.toBeNull();
  });
});
