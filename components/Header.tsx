'use client';

import { Upload, LogOut, Rocket, Menu, Loader2, Video, ChartAreaIcon } from 'lucide-react';
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoaded, user } = useUser();

  const NavigationLinks = ({ isMobile = false }) => (
    <div className={`flex ${isMobile ? 'flex-col items-start' : 'items-center'} gap-6`}>
      <SignedIn>
        <Link
          href="https://5-chan-shardendu-mishra.vercel.app/"
          className={`flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-medium
            ${isMobile ? 'w-full py-2' : ''}`}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          <ChartAreaIcon className="h-4 w-4" />
          <span>Chat Anonymously</span>
        </Link>
        <Link
          href="/view"
          className={`flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-medium
            ${isMobile ? 'w-full py-2' : ''}`}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          <Video className="h-4 w-4" />
          <span>Watch Videos</span>
        </Link>
        <Link
          href="/upload"
          className={`flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-medium
            ${isMobile ? 'w-full py-2' : ''}`}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          <Upload className="h-4 w-4" />
          <span>Upload</span>
        </Link>
        <Link
          href="/ask-ai"
          className={`flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-medium
            ${isMobile ? 'w-full py-2' : ''}`}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          <Rocket className="h-4 w-4" />
          <span>Ask AI</span>
        </Link>
        {!isMobile && <div className="h-5 w-px bg-gray-700" />}
        <div className={`${isMobile ? 'w-full py-2' : ''}`}>
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-8 w-8"
              }
            }}
          />
        </div>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button className={`flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-medium
            ${isMobile ? 'w-full py-2' : ''}`}>
            <span>Login</span>
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-black/90 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">  
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="block"
              aria-label="Home"
            >
              {/* Text Logo */}
              <span className="text-2xl font-bold text-purple-400 hover:text-purple-300 transition-colors">
                Scroller
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            {!isLoaded ? (
              <Loader2 className="animate-spin h-5 w-5 text-gray-300" />
            ) : (
              <NavigationLinks />
            )}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-9 w-9 p-0 text-gray-300 hover:text-white hover:bg-gray-800"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 bg-gray-900/95 border-gray-700 p-0">
                <nav className="flex flex-col p-4">
                  {isLoaded && <NavigationLinks isMobile={true} />}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;