import NotFound from '@/components/NotFoundPage';
import { Metadata } from 'next';
import React from 'react';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const page = () => {
  return <NotFound />;
};

export const metadata: Metadata = {
  title: 'Page Not Found',
};

export default page;
