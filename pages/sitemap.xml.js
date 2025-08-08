export async function getServerSideProps({ res }) {
  const languages = ['en', 'fa']; // زبان‌های پشتیبانی‌شده
  const pages = ['about', 'calendar', 'citizens', 'contact', 'education', 'levels', 'test', 'version'];

  res.setHeader('Content-Type', 'text/xml');
  res.write(`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`);

  // اضافه کردن صفحه اصلی برای هر زبان
  languages.forEach(lang => {
    res.write(`
      <url>
        <loc>https://rgb-ips.com/${lang}</loc>
        <lastmod>2025-08-08</lastmod>
        <priority>1.0</priority>
      </url>`);
  });

  // اضافه کردن صفحات دیگر برای هر زبان
  pages.forEach(page => {
    languages.forEach(lang => {
      res.write(`
        <url>
          <loc>https://rgb-ips.com/${lang}/${page}</loc>
          <lastmod>2025-08-08</lastmod>
          <priority>0.8</priority>
        </url>`);
    });
  });

  res.write('</urlset>');
  res.end();
  return { props: {} };
}