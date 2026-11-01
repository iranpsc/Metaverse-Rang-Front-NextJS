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

  http.get(/\/api\/citizen\/[^/]+\/referrals\/chart$/, ({ request }) => {
    const parts = pathParts(request);
    const range = new URL(request.url).searchParams.get('range');
    return HttpResponse.json({ data: [{ citizenId: parts.at(-3), range, count: 4 }] });
  }),

  http.get(/\/api\/citizen\/[^/]+\/referrals$/, ({ request }) => {
    const parts = pathParts(request);
    const search = new URL(request.url).searchParams.get('search');
    return HttpResponse.json({ data: [{ id: 301, citizenId: parts.at(-2), search }] });
  }),

  http.get(/\/api\/citizen\/[^/]+$/, ({ request }) => {
    const parts = pathParts(request);
    return HttpResponse.json({ data: { id: parts.at(-1), display_name: 'Test Citizen' } });
  }),

  http.get(/\/api\/calendar$/, ({ request }) => {
    const type = new URL(request.url).searchParams.get('type');
    return HttpResponse.json({ data: [{ id: 401, type }] });
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
