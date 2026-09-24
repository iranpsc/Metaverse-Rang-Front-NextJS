// src/fonts/localFonts.js
import localFont from 'next/font/local';

// Keep the three most-used weights to cut first-paint font bytes.
// Browser synthesizes other weights when needed.
export const azarMehr = localFont({
  src: [
    { path: '../../public/fonts/AzarMehr-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/AzarMehr-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/AzarMehr-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-azarMehr',
  display: 'swap',
  fallback: ['system-ui', 'Tahoma', 'sans-serif'],
  // These are applied at the [lang] layout/body level, so every route
  // was preloading all 3 weights (~130KB) whether that page used them
  // or not, putting them on the render-blocking critical path. swap +
  // fallback already keep text visible instantly, so preload buys us
  // nothing but a slower first paint — turn it off.
  preload: false,
});

export const rokh = localFont({
  src: [
    { path: '../../public/fonts/Rokh-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-rokh',
  display: 'swap',
  fallback: ['system-ui', 'Tahoma', 'sans-serif'],
  // Same reasoning as azarMehr above.
  preload: false,
});