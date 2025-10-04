import Chat from '@/components/AI/Chat';
import React from 'react';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const page = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

export default page;
