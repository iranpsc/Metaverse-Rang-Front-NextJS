import { http, HttpResponse } from 'msw';

const languages = [
  {
    code: 'fa',
    direction: 'rtl',
    file_url: 'https://rgb.irpsc.com/lang/fa.json',
    name: 'فارسی',
  },
  {
    code: 'en',
    direction: 'ltr',
    file_url: 'https://rgb.irpsc.com/lang/en.json',
    name: 'English',
  },
  {
    code: 'ar',
    direction: 'rtl',
    file_url: 'https://rgb.irpsc.com/lang/ar.json',
    name: 'العربية',
  },
];

const dictionaries = {
  fa: { 1457: 'متاورس رنگ', 482: 'توضیحات نمونه فارسی' },
  en: { 1457: 'Metaverse Rang', 482: 'Sample English description' },
  ar: { 1457: 'ميتافيرس رنگ', 482: 'وصف تجريبي باللغة العربية' },
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

  http.get(/\/lang\/(fa|en|ar)\.json$/, ({ request }) => {
    const language = new URL(request.url).pathname.match(/\/(fa|en|ar)\.json$/)?.[1] as
      | keyof typeof dictionaries
      | undefined;

    if (!language) {
      return HttpResponse.json({ message: 'Dictionary not found.' }, { status: 404 });
    }

    return HttpResponse.json(dictionaries[language]);
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
];
