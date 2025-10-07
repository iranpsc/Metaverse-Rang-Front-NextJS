// src/fonts/localFonts.js
import localFont from 'next/font/local';

// فونت آذر مهر با همه وزن‌ها
export const azarMehr = localFont({
  src: [
    { path: '../../public/fonts/AzarMehr-Light.woff2', weight: '300', style: 'normal' },
    { path: '../../public/fonts/AzarMehr-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/AzarMehr-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/AzarMehr-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/AzarMehr-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/AzarMehr-ExtraBold.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-azarMehr',
  display: 'swap', // این گزینه باعث می‌شود متن بدون تأخیر رندر شود
   fallback: ['system-ui', 'Tahoma', 'sans-serif'],
});

// فونت رخ (فقط وزن Bold)
export const rokh = localFont({
  src: [
    { path: '../../public/fonts/Rokh-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-rokh',
  display: 'swap',
});
