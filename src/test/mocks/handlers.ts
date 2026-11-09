import { http, HttpResponse } from 'msw';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const languageCodePattern = /^[A-Za-z]{2,8}(?:-[A-Za-z0-9]{1,8})*$/;
const rtlLanguageCodes = new Set(['ar', 'fa', 'he', 'ps', 'ur']);
const languageNames: Record<string, string> = { ar: 'العربية', en: 'English', fa: 'فارسی', ru: 'Русский', zh: '中文' };
const localEnvContent = (() => {
  try { return readFileSync(join(process.cwd(), '.env.local'), 'utf8'); }
  catch { return ''; }
})();
const localLanguageSetting = localEnvContent.match(/^\s*MOCK_ACTIVE_LANGUAGES\s*=\s*(.*?)\s*$/m)?.[1];
const configuredLanguageCodes = (process.env.MOCK_ACTIVE_LANGUAGES || localLanguageSetting || 'fa,en,ar,ru,zh')
  .split(',').map((code) => code.trim()).filter((code) => languageCodePattern.test(code));
const dictionaryFileCodes = (() => {
  try {
    return readdirSync(join(process.cwd(), 'public', 'lang'))
      .filter((file) => file.endsWith('.json'))
      .map((file) => file.slice(0, -5))
      .filter((code) => languageCodePattern.test(code));
  } catch { return []; }
})();
const activeLanguageCodes = [...new Set([...configuredLanguageCodes, ...dictionaryFileCodes])];
const languages = activeLanguageCodes.map((code) => ({
  code,
  direction: rtlLanguageCodes.has(code.split('-')[0].toLowerCase()) ? 'rtl' : 'ltr',
  file_url: `https://rgb.irpsc.com/lang/${code}.json`,
  name: languageNames[code] || code,
}));
const fallbackDictionary: Record<string, string> = {
  1457: 'Metaverse Rang',
  482: 'Deterministic translation fixture',
};
const dictionaries: Record<string, Record<string, string>> = {
  fa: { 1457: 'متاورس رنگ', 482: 'توضیحات نمونه فارسی' },
  en: fallbackDictionary,
  ar: { 1457: 'ميتافيرس رنگ', 482: 'وصف تجريبي باللغة العربية' },
  ru: fallbackDictionary,
  zh: fallbackDictionary,
};
const featureSummaryFixtures = [
  { karbari: 'blue', label: 'Blue', count: 3, amount: 3 },
];
const featureChartFixture = {
  bought: [{ amount: 3, karbari: 'blue', label: '2026' }],
  sold: [{ amount: 1, karbari: 'blue', label: '2026' }],
};
const buildingSummaryFixtures = [
  { karbari: 'blue', label: 'Blue', count: 2 },
];
const buildingChartFixtures = [
  { amount: 2, karbari: 'blue', label: '2026' },
];
const buildingListFixtures = [
  {
    building_id: 501,
    karbari: 'blue',
    construction_end_date: '2026-12-31',
    visitors: 10,
    empty_units: 2,
    area: 100,
    density: 5,
    images: [{ id: 1, url: '/team.webp' }],
  },
];
const walletSummaryFixtures = [
  {
    asset: 'blue',
    current_balance: 10,
    direction: 'up',
    growth_percent: 5,
    period_income: 2,
    period_spending: 1,
    privacy_restricted: false,
  },
];
const walletChartFixture = {
  blue: {
    income: [{ amount: 2, label: '2026' }],
    spending: [{ amount: 1, label: '2026' }],
  },
};


const pathParts = (request: Request) => new URL(request.url).pathname.split('/').filter(Boolean);

export const handlers = [
  http.get(/\/api\/translations$/, ({ request }) => {
    const url = new URL(request.url);

    if (url.searchParams.get('active') !== 'true') {
      return HttpResponse.json(
        { message: 'The active=true query parameter is required.' },
        { status: 400 },
      );
    }

    return HttpResponse.json({ data: languages });
  }),

  http.get(/\/lang\/([A-Za-z]{2,8}(?:-[A-Za-z0-9]{1,8})*)\.json$/, ({ request }) => {
    const language = new URL(request.url).pathname.match(/\/([A-Za-z]{2,8}(?:-[A-Za-z0-9]{1,8})*)\.json$/)?.[1];
    if (!language || !activeLanguageCodes.includes(language)) {
      return HttpResponse.json({ message: 'Dictionary not found.' }, { status: 404 });
    }
    return HttpResponse.json(dictionaries[language] || fallbackDictionary);
  }),

  // Match API paths independently of host so tests can use loopback-only URLs.
  http.get(/\/api\/users$/, ({ request }) => {
    const page = new URL(request.url).searchParams.get('page');
    return HttpResponse.json({ data: [{ id: 101, page }] });
  }),

  http.get(/\/api\/levels$/, () =>
    HttpResponse.json({ data: [{ id: 1, name: 'Starter' }] }),
  ),

  http.get(/\/api\/levels\/[^/]+\/[^/]+$/, ({ request }) => {
    const parts = pathParts(request);
    return HttpResponse.json({ data: { levelId: parts.at(-2), tab: parts.at(-1) } });
  }),

  http.get(/\/api\/levels\/[^/]+$/, ({ request }) => {
    const parts = pathParts(request);
    return HttpResponse.json({ data: { id: parts.at(-1), name: 'Starter' } });
  }),

  http.get(/\/api\/tutorials\/categories$/, () =>
    HttpResponse.json({ data: [{ id: 5, slug: 'basics' }] }),
  ),

  http.get(/\/api\/tutorials$/, ({ request }) => {
    const page = new URL(request.url).searchParams.get('page');
    return HttpResponse.json({ data: [{ id: 201, page }] });
  }),

  http.get(/\/api\/tutorials\/[^/]+$/, ({ request }) => {
    const slug = pathParts(request).at(-1);
    return HttpResponse.json({
      data: {
        id: Number(slug) || 1,
        slug,
        title: 'Sandbox tutorial video',
        description: 'Deterministic tutorial content.',
        image_url: '/team.webp',
        likes_count: 2,
        dislikes_count: 0,
      },
    });
  }),

  http.get(/\/api\/citizen\/[^/]+\/referrals\/chart$/, () =>
    HttpResponse.json({
      data: {
        chart_data: [
          {
            year: '2026',
            total_referrals_count: 4,
            total_referral_orders_amount: 12,
            month: 'October',
            day: 'Thursday',
            hour: '12',
            referrals_count: 4,
            referral_orders_amount: 12,
          },
        ],
      },
    }),
  ),

  http.get(/\/api\/citizen\/[^/]+\/referrals$/, ({ request }) => {
    const parts = pathParts(request);
    const search = new URL(request.url).searchParams.get('search');
    return HttpResponse.json({ data: [{ id: 301, citizenId: parts.at(-2), search }] });
  }),

  http.get(/\/api\/citizen\/[^/]+\/features\/summary$/, () =>
    HttpResponse.json({ data: featureSummaryFixtures }),
  ),

  http.get(/\/api\/citizen\/[^/]+\/features\/chart$/, () =>
    HttpResponse.json({ data: featureChartFixture }),
  ),

  http.get(/\/api\/citizen\/[^/]+\/buildings\/summary$/, () =>
    HttpResponse.json({ data: buildingSummaryFixtures }),
  ),

  http.get(/\/api\/citizen\/[^/]+\/buildings\/chart$/, () =>
    HttpResponse.json({ data: buildingChartFixtures }),
  ),

  http.get(/\/api\/citizen\/[^/]+\/buildings$/, ({ request }) => {
    const page = Number(new URL(request.url).searchParams.get('page') || 1);
    return HttpResponse.json({
      data: buildingListFixtures,
      meta: { current_page: page, last_page: 1 },
    });
  }),

  http.get(/\/api\/citizen\/[^/]+\/wallet\/history\/summary$/, () =>
    HttpResponse.json({ data: walletSummaryFixtures }),
  ),

  http.get(/\/api\/citizen\/[^/]+\/wallet\/history\/chart$/, () =>
    HttpResponse.json({ data: walletChartFixture }),
  ),

  http.get(/\/api\/citizen\/[^/]+$/, ({ request }) => {
    const parts = pathParts(request);
    return HttpResponse.json({ data: { id: parts.at(-1), display_name: 'Test Citizen' } });
  }),

  http.get(/\/api\/calendar$/, ({ request }) => {
    const type = new URL(request.url).searchParams.get('type');
    return HttpResponse.json({ data: [{ id: 401, type }] });
  }),

  http.get(/\/api\/calendar\/[^/]+$/, ({ request }) => {
    const id = Number(pathParts(request).at(-1));
    return HttpResponse.json({
      data: {
        id,
        title: 'Sandbox calendar event',
        description: 'Deterministic event fixture.',
        starts_at: '2026-10-01 12:00',
        ends_at: '2026-10-01 13:00',
        image: '/team.webp',
        likes: 3,
        dislikes: 0,
        views: 12,
        user_interaction: null,
      },
    });
  }),

  http.get(/\/api\/tutorials\/categories\/[^/]+\/[^/]+$/, ({ request }) => {
    const parts = pathParts(request);
    return HttpResponse.json({ data: { category: parts.at(-2), subcategory: parts.at(-1) } });
  }),

  http.get(/\/api\/tutorials\/categories\/[^/]+$/, ({ request }) => {
    const parts = pathParts(request);
    return HttpResponse.json({ data: { slug: parts.at(-1), title: 'Basics' } });
  }),

  http.get(/\/api\/tutorials\/[^/]+\/comments$/, ({ request }) => {
    const parts = pathParts(request);
    const page = new URL(request.url).searchParams.get('page');
    return HttpResponse.json({ data: [{ videoId: parts.at(-2), page }] });
  }),

  // Authentication contracts (mocked without requiring a real session).
  http.post(/\/api\/auth\/me$/, () =>
    HttpResponse.json({ data: { code: 'TEST-CITIZEN', id: 100, display_name: 'Mock Citizen' } }),
  ),
  http.post(/\/api\/auth\/register$/, () =>
    HttpResponse.json({ data: { registered: true, redirect_url: '/fa' } }, { status: 201 }),
  ),
  http.get(/\/api\/auth\/redirect$/, () =>
    HttpResponse.json({ url: 'http://127.0.0.1:5175/fa' }),
  ),
  http.post(/\/api\/auth\/referral$/, () =>
    HttpResponse.json({ data: { referral_applied: true } }),
  ),
  http.post(/\/api\/auth\/logout$/, () =>
    HttpResponse.json({ data: { logged_out: true } }),
  ),

  // Calendar routes not covered by the list/detail GET handlers above.
  http.get(/\/api\/calendar\/filter$/, () =>
    HttpResponse.json({ data: [{ id: 401, title: 'Filtered mock event' }] }),
  ),
  http.get(/\/api\/calendar\/events\/[^/]+$/, ({ request }) => {
    const id = Number(pathParts(request).at(-1));
    return HttpResponse.json({ data: { id, title: 'Mock event (legacy events route)' } });
  }),
  http.post(/\/api\/calendar\/events\/[^/]+\/interact$/, () =>
    HttpResponse.json({ data: { interacted: true } }),
  ),

  // Tutorial search and authenticated comment mutations.
  http.post(/\/api\/tutorials\/search$/, () =>
    HttpResponse.json({ data: [{ id: 201, slug: 'mock-video', title: 'Mock tutorial' }] }),
  ),
  http.post(/\/api\/tutorials\/[^/]+\/comments$/, () =>
    HttpResponse.json({ data: { id: 701, content: 'Mock comment' } }, { status: 201 }),
  ),
  http.post(/\/api\/tutorials\/[^/]+\/comments\/[^/]+$/, () =>
    HttpResponse.json({ data: { updated: true } }),
  ),
  http.delete(/\/api\/tutorials\/[^/]+\/comments\/[^/]+$/, () =>
    HttpResponse.json({ data: { deleted: true } }),
  ),
  http.post(/\/api\/tutorials\/[^/]+\/comments\/[^/]+\/like$/, () =>
    HttpResponse.json({ data: { liked: true } }),
  ),
  http.post(/\/api\/tutorials\/[^/]+\/comments\/[^/]+\/dislike$/, () =>
    HttpResponse.json({ data: { disliked: true } }),
  ),
  http.post(/\/api\/tutorials\/[^/]+\/comments\/[^/]+\/report$/, () =>
    HttpResponse.json({ data: { reported: true } }),
  ),
  http.post(/\/api\/tutorials\/[^/]+\/comments\/[^/]+\/interactions$/, () =>
    HttpResponse.json({ data: { interaction_saved: true } }),
  ),

  // Comment replies.
  http.get(/\/api\/comments\/[^/]+\/replies$/, () =>
    HttpResponse.json({ data: [{ id: 801, content: 'Mock reply' }] }),
  ),
  http.post(/\/api\/comments\/[^/]+\/reply$/, () =>
    HttpResponse.json({ data: { id: 802, content: 'Created mock reply' } }, { status: 201 }),
  ),
  http.post(/\/api\/comments\/[^/]+\/replies\/[^/]+\/interactions$/, () =>
    HttpResponse.json({ data: { interaction_saved: true } }),
  ),
  http.delete(/\/api\/comments\/[^/]+\/replies\/[^/]+$/, () =>
    HttpResponse.json({ data: { deleted: true } }),
  ),

  // Remaining citizen APIs.
  http.post(/\/api\/search\/users$/, () =>
    HttpResponse.json({ data: [{ id: 101, display_name: 'Mock Citizen' }] }),
  ),
  http.get(/\/api\/citizen\/[^/]+\/features$/, () =>
    HttpResponse.json({
      data: [{ id: 901, karbari: 'blue', label: 'Mock feature' }],
      map_markers: [],
      meta: { last_page: 1 },
    }),
  ),

];
