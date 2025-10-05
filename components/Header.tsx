'use client';

import { 
  Upload, 
  Bot,
  Menu, 
  Loader2, 
  Play, 
  MessageSquareText,
  Home,
  LogIn
} from 'lucide-react';
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoaded } = useUser();

  const NavigationLinks = ({ isMobile = false }) => (
    <div className={`flex ${isMobile ? 'flex-col items-start space-y-1' : 'items-center'} gap-2`}>
      <SignedIn>
        <Link
          href="/"
          className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium
            text-foreground/80 hover:text-foreground hover:bg-accent/10
            transition-all duration-200 ease-in-out
            ${isMobile ? 'w-full' : 'hover:-translate-y-0.5'}
          `}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          <Home className="h-4 w-4 group-hover:text-primary transition-colors" />
          <span>Home</span>
        </Link>
        
        <Link
          href="/view"
          className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium
            text-foreground/80 hover:text-foreground hover:bg-accent/10
            transition-all duration-200 ease-in-out
            ${isMobile ? 'w-full' : 'hover:-translate-y-0.5'}
          `}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          <Play className="h-4 w-4 group-hover:text-primary transition-colors" />
          <span>Watch Videos</span>
        </Link>
        
        <Link
          href="/upload"
          className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium
            text-foreground/80 hover:text-foreground hover:bg-accent/10
            transition-all duration-200 ease-in-out
            ${isMobile ? 'w-full' : 'hover:-translate-y-0.5'}
          `}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          <Upload className="h-4 w-4 group-hover:text-primary transition-colors" />
          <span>Upload</span>
        </Link>
        
        <Link
          href="/ask-ai"
          className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium
            text-foreground/80 hover:text-foreground hover:bg-accent/10
            transition-all duration-200 ease-in-out
            ${isMobile ? 'w-full' : 'hover:-translate-y-0.5'}
          `}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          <Bot className="h-4 w-4 group-hover:text-primary transition-colors" />
          <span>Ask AI</span>
        </Link>
        
        <Link
          href="https://5-chan-shardendu-mishra.vercel.app/"
          className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium
            text-foreground/80 hover:text-foreground hover:bg-accent/10
            transition-all duration-200 ease-in-out
            ${isMobile ? 'w-full' : 'hover:-translate-y-0.5'}
          `}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageSquareText className="h-4 w-4 group-hover:text-primary transition-colors" />
          <span>Anonymous Chat</span>
        </Link>

        {!isMobile && <div className="h-6 w-px bg-border mx-2" />}
        
        <div className={`${isMobile ? 'w-full pt-4 border-t border-border' : ''}`}>
          <div className="flex items-center gap-2">
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9 ring-2 ring-primary/20 hover:ring-primary/40 transition-all",
                  userButtonPopoverCard: "bg-card border border-border shadow-xl",
                  userButtonPopoverActionButton: "hover:bg-accent/10"
                }
              }}
            />
            {isMobile && (
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">Profile</span>
                <span className="text-xs text-muted-foreground">Manage account</span>
              </div>
            )}
          </div>
        </div>
      </SignedIn>
      
      <SignedOut>
        <SignInButton mode="modal">
          <Button 
            variant="outline" 
            size="sm"
            className={`group font-medium border-primary/20 hover:border-primary hover:bg-primary/5
              ${isMobile ? 'w-full justify-start' : ''}
            `}
          >
            <LogIn className="h-4 w-4 mr-2 group-hover:text-primary transition-colors" />
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full glass-effect border-b border-border/50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="group flex items-center gap-3"
              aria-label="Scroller Home"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                S
              </div>
              <span className="text-xl font-bold gradient-text group-hover:scale-105 transition-transform duration-200">
                Scroller
              </span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center">
            {!isLoaded ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="animate-spin h-4 w-4" />
                <span className="text-sm">Loading...</span>
              </div>
            ) : (
              <NavigationLinks />
            )}
          </nav>

          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 hover:bg-accent/10 border border-border/50"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-80 bg-card/95 backdrop-blur-xl border-border/50"
              >
                <div className="flex flex-col space-y-6">
                  <div className="flex items-center gap-3 pt-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground font-bold text-xl">
                      S
                    </div>
                    <span className="text-2xl font-bold gradient-text">
                      Scroller
                    </span>
                  </div>
                  
                  <nav className="flex flex-col">
                    {isLoaded && <NavigationLinks isMobile={true} />}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
