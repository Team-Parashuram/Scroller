'use client';

import { SignUp } from '@clerk/nextjs';

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-indigo-950">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-purple-200 md:text-5xl lg:text-6xl">
            Join Our Community
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-purple-300">
            Create an account to start sharing and discovering amazing videos
          </p>
        </section>

        <div className="mx-auto flex justify-center">
          <SignUp 
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-black/40 backdrop-blur-sm border border-purple-900/30"
              }
            }}
            routing="path"
            path="/register"
            signInUrl="/login"
          />
        </div>
      </main>
    </div>
  );
};

export default Page;
