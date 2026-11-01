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
];
