import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { http, HttpResponse } from 'msw';

const { cookiesMock } = vi.hoisted(() => ({
  cookiesMock: vi.fn(),
}));

vi.mock('next/headers', () => ({
  cookies: cookiesMock,
}));
import {
  getAllCategories,
  getAllCategoryVideos,
  getAllCitizen,
  getAllLevels,
  getLangArray,
  getLevelTabs,
  getMainFile,
  getSingleLevel,
  getTranslation,
  getUserData,
  getAllReferral,
  getChartReferral,
  getAllVersions,
  getEducationSingleCategory,
  getSubcategoryData,
  getVideoComments,
  getSingleVideoData,
} from './actions';
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


describe('core API data actions', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_API_BASE_URL', 'https://dev-api.metarang.com');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('requests the requested citizens page', async () => {
    await expect(getAllCitizen(3)).resolves.toMatchObject({
      data: [{ id: 101, page: '3' }],
    });
  });

  it('returns level data from the main API', async () => {
    await expect(getAllLevels()).resolves.toEqual([
      { id: 1, name: 'Starter' },
    ]);
  });

  it('loads a single level and its selected tab', async () => {
    await expect(getSingleLevel(7)).resolves.toMatchObject({
      data: { id: '7', name: 'Starter' },
    });

    await expect(getLevelTabs({ tabs: 'general' }, 7)).resolves.toMatchObject({
      data: { levelId: '7', tab: 'general' },
    });
  });

  it('returns null for missing level parameters without making a request', async () => {
    await expect(getSingleLevel('')).resolves.toBeNull();
    await expect(getLevelTabs({ tabs: 'general' }, null)).resolves.toBeNull();
  });

  it('loads tutorial categories and paginated videos', async () => {
    await expect(getAllCategories()).resolves.toEqual([
      { id: 5, slug: 'basics' },
    ]);

    await expect(getAllCategoryVideos(2)).resolves.toEqual([
      { id: 201, page: '2' },
    ]);
  });
});


describe('citizen and referral API actions', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_API_BASE_URL', 'https://dev-api.metarang.com');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('loads citizen data using a normalized identifier', async () => {
    await expect(getUserData('AbC-123')).resolves.toMatchObject({
      data: { id: 'abc-123', display_name: 'Test Citizen' },
    });
  });

  it('does not request citizen data for an invalid identifier', async () => {
    await expect(getUserData('../private')).resolves.toMatchObject({
      props: { error: expect.any(String) },
    });
  });

  it('loads referrals with the requested search term', async () => {
    await expect(getAllReferral('AbC-123', 'test user')).resolves.toMatchObject({
      data: [{ id: 301, citizenId: 'AbC-123', search: 'test user' }],
    });
  });

  it('loads referral chart data for the selected range', async () => {
    await expect(getChartReferral('AbC-123', '30d')).resolves.toEqual([
      { citizenId: 'AbC-123', range: '30d', count: 4 },
    ]);
  });

  it('rejects invalid citizen identifiers before referral requests', async () => {
    await expect(getAllReferral('../private')).resolves.toMatchObject({
      props: { error: expect.any(String) },
    });
    await expect(getChartReferral('../private')).resolves.toMatchObject({
      props: { error: expect.any(String) },
    });
  });
});


describe('calendar and tutorial detail API actions', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_API_BASE_URL', 'https://dev-api.metarang.com');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('loads calendar versions', async () => {
    await expect(getAllVersions()).resolves.toEqual([
      { id: 401, type: 'version' },
    ]);
  });

  it('loads a tutorial category and returns null for an invalid slug', async () => {
    await expect(getEducationSingleCategory('basics')).resolves.toEqual({
      slug: 'basics',
      title: 'Basics',
    });
    await expect(getEducationSingleCategory('../private')).resolves.toBeNull();
  });

  it('loads a tutorial subcategory', async () => {
    await expect(getSubcategoryData('basics', 'intro')).resolves.toEqual({
      category: 'basics',
      subcategory: 'intro',
    });
  });

  it('rejects invalid tutorial subcategory parameters', async () => {
    await expect(getSubcategoryData('../private', 'intro')).rejects.toThrow(
      'Invalid category or subcategory',
    );
  });

  it('loads comments for a video', async () => {
    await expect(getVideoComments('video-123')).resolves.toEqual({
      data: [{ videoId: 'video-123', page: '1' }],
    });
  });
});


describe('authenticated tutorial video action', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_API_BASE_URL', 'https://dev-api.metarang.com');
    cookiesMock.mockResolvedValue({ get: vi.fn().mockReturnValue(undefined) });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    cookiesMock.mockReset();
  });

  it('loads video data without an Authorization header when auth cookie is absent', async () => {
    let authorization: string | null = 'unexpected';
    server.use(
      http.get('https://dev-api.metarang.com/api/tutorials/:slug', ({ request }) => {
        authorization = request.headers.get('authorization');
        return HttpResponse.json({ data: { slug: 'video-123', likes_count: 4 } });
      }),
    );

    await expect(getSingleVideoData('video-123')).resolves.toEqual({
      slug: 'video-123',
      likes_count: 4,
    });
    expect(authorization).toBeNull();
  });

  it('extracts a token from the auth cookie and sends a Bearer token', async () => {
    cookiesMock.mockResolvedValue({
      get: vi.fn().mockReturnValue({ value: 'session=abc&token=secure-token&other=value' }),
    });
    let authorization: string | null = null;
    server.use(
      http.get('https://dev-api.metarang.com/api/tutorials/:slug', ({ request }) => {
        authorization = request.headers.get('authorization');
        return HttpResponse.json({ data: { slug: 'video-123', user_interaction: 'liked' } });
      }),
    );

    await expect(getSingleVideoData('video-123')).resolves.toEqual({
      slug: 'video-123',
      user_interaction: 'liked',
    });
    expect(authorization).toBe('Bearer secure-token');
  });

  it('does not send an Authorization header when the auth cookie has no token', async () => {
    cookiesMock.mockResolvedValue({
      get: vi.fn().mockReturnValue({ value: 'session=abc&theme=dark' }),
    });
    let authorization: string | null = 'unexpected';
    server.use(
      http.get('https://dev-api.metarang.com/api/tutorials/:slug', ({ request }) => {
        authorization = request.headers.get('authorization');
        return HttpResponse.json({ data: { slug: 'video-123' } });
      }),
    );

    await expect(getSingleVideoData('video-123')).resolves.toEqual({ slug: 'video-123' });
    expect(authorization).toBeNull();
  });

  it.each(['', '../private', 'video/123', 'video?admin=true', 'video slug'])(
    'does not make a request for an invalid video slug: %s',
    async (slug) => {
      const requestSpy = vi.fn();
      server.use(
        http.get('https://dev-api.metarang.com/api/tutorials/:slug', () => {
          requestSpy();
          return HttpResponse.json({ data: {} });
        }),
      );

      await expect(getSingleVideoData(slug)).resolves.toBeNull();
      expect(requestSpy).not.toHaveBeenCalled();
    },
  );

  it.each([401, 403, 404, 500, 503])(
    'returns null when the video API responds with HTTP %i',
    async (status) => {
      server.use(
        http.get('https://dev-api.metarang.com/api/tutorials/:slug', () =>
          HttpResponse.json({ message: 'Request failed' }, { status }),
        ),
      );

      await expect(getSingleVideoData('video-123')).resolves.toBeNull();
    },
  );

  it('returns null when the video API responds with malformed JSON', async () => {
    server.use(
      http.get('https://dev-api.metarang.com/api/tutorials/:slug', () =>
        new HttpResponse('{invalid-json', {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );

    await expect(getSingleVideoData('video-123')).resolves.toBeNull();
  });
});
