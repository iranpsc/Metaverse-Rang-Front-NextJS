// src/components/NotFoundPage.tsx
import React from 'react';

interface NotFoundPageProps {
  lang?: string;
}

export default function NotFoundPage({ lang }: NotFoundPageProps) {
  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h1 className='text-error'>404 - صفحه مورد نظر پیدا نشد</h1>
      {lang ? (
        <a href={`/${lang}`} style={{ color: 'blue', textDecoration: 'underline' }}>
          بازگشت به صفحه اصلی
        </a>
      ) : (
        <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
          بازگشت به صفحه اصلی
        </a>
      )}
    </div>
  );
}
