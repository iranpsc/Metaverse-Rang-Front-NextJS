const baseUrl = process.env.NEXT_PUBLIC_URL;
export const headerCategories = [
    { title: ' صفحه نخست', href: `${baseUrl}`},
    { title: 'اخبار ', href: `${baseUrl}/home-news`},
    { title: 'مقالات ', href: `${baseUrl}/home-blogs`},
    { title: ' مسابقات', href: `${baseUrl}/home-competitions`},
    { title: 'آموزش ها ', href: '/trainings'},
    { title: ' درباره‌ما', href: `${baseUrl}/about`},
    { title: 'تماس‌با‌ما ', href: `${baseUrl}/contact`},
    { title: ' ورژن', href: `${baseUrl}/version`},
    { title: ' نمای‌کلی', href: `${baseUrl}/overview`},
  ];