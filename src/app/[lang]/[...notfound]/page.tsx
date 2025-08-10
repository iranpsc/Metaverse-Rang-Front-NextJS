// src/app/[lang]/[...notfound]/page.tsx
import NotFoundPage from '@/components/shared/NotFoundPage';
interface NotFoundCatchAllProps {
  params: {
    lang: string;
    // چون catch-all هست ممکنه ...notfound هم باشه ولی اگر لازم نداری می‌تونی حذف کنی
  };
}

export default function NotFoundCatchAll({ params }: NotFoundCatchAllProps) {
  return <NotFoundPage lang={params.lang} />;
}
