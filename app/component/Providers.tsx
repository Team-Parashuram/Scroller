'use client';

import { ImageKitProvider } from 'imagekitio-next';

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY!;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;

export default function Providers({ children }: { children: React.ReactNode }) {
  const authenticator = async () => {
    try {
      
      const res = await fetch('/api/imagekitauth');

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error('Failed to authenticate with ImageKit');
      }
      
      const authData = await res.json();
      return authData;
    } catch (error) {
      throw error;
    }
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      {children}
    </ImageKitProvider>
  );
}
