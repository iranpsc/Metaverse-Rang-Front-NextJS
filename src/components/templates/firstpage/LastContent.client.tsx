'use client';

import dynamic from 'next/dynamic';

const LastContent = dynamic(
  () => import('@/components/templates/firstpage/LastContent'),
  { ssr: false }
);

export default LastContent;