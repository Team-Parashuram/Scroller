/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Loader2,
  SendHorizontal,
  MessageCircle,
  CircleX,
  CheckCircle2,
  UserCircle,
  Bot,
} from 'lucide-react';
import toast from 'react-hot-toast';
import apiRequest from '@/util/apiRequest';
import Header from '../Header';

const Chat = () => {
  const apiKeyRef = useRef<string>('');
  const [genAI, setGenAI] = useState<GoogleGenerativeAI | null>(null);
  const [model, setModel] = useState<any>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);
  const [chat, setChat] = useState<{
    id: number;
    type: 'user' | 'ai';
    message: string;
  }[]>([]);

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        setInitializing(true);
        setInitError(null);
        
        // Use correct API route path
        const res = await fetch('/api/ai');
        
        if (!res.ok) {
          throw new Error(`API request failed with status ${res.status}`);
        }
        
        const data = await res.json();
        
        if (data.status === 200 && data.data) {
          if (data.data === 'placeholder_api_key') {
            setInitError('Gemini API key not configured. Please add a valid GEMINI_API_KEY to your .env.local file.');
            toast.error('AI service not configured', {
              duration: 5000,
              icon: <CircleX />,
            });
            return;
          }
          
          apiKeyRef.current = data.data;
          const newGenAI = new GoogleGenerativeAI(apiKeyRef.current);
          setGenAI(newGenAI);
          setModel(newGenAI.getGenerativeModel({ model: 'gemini-2.0-flash' }));
          toast.success('AI service initialized', {
            icon: <CheckCircle2 className="text-purple-400" />,
          });
        } else {
          throw new Error('Invalid API response');
        }
      } catch (error) {
        console.error('Failed to initialize AI:', error);
        setInitError(`Failed to initialize AI service: ${error instanceof Error ? error.message : 'Unknown error'}`);
        toast.error('Failed to connect to AI service', {
          duration: 5000,
          icon: <CircleX />,
        });
      } finally {
        setInitializing(false);
      }
    };
    fetchApiKey();
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);

  const chatSession = useMemo(() => {
    if (model) {
      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: 'text/plain',
      };
      return model.startChat({
        generationConfig,
        history: [],
      });
    }
    return null;
  }, [model]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat]);

  const handleSubmit = async () => {
    if (!prompt.trim() || !chatSession) {
      if (!chatSession) {
        toast.error('AI service not ready. Please wait...', {
          icon: <CircleX />,
        });
      }
      return;
    }

    const userMessage = {
      id: Date.now(),
      type: 'user' as const,
      message: prompt,
    };

    setChat((prev) => [...prev, userMessage]);
    setLoading(true);
    setPrompt(''); // Clear input immediately for better UX

    const specialPrompt = process.env.NEXT_PUBLIC_SPECIAL_PROMPT || '';
    const modifiedPrompt = specialPrompt ? `${prompt}, ${specialPrompt}` : prompt;

    try {
      const result = await chatSession.sendMessage(modifiedPrompt);
      const responseText = result.response.text();
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai' as const,
        message: responseText,
      };
      setChat((prev) => [...prev, aiMessage]);
      toast.success('Message sent successfully', {
        icon: <CheckCircle2 className="text-purple-400" />,
        style: {
          borderRadius: '10px',
          background: '#1a1a1a',
          color: '#d1d1d1',
          border: '1px solid rgba(139, 92, 246, 0.3)',
        },
      });
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai' as const,
        message: 'Sorry, there was an error processing your request. Please try again.',
      };
      setChat((prev) => [...prev, errorMessage]);
      toast.error('Failed to send message', {
        icon: <CircleX />,
        style: {
          borderRadius: '10px',
          background: '#1a1a1a',
          color: '#ff4b4b',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit();
    }
  };

  const clearChat = () => {
    setChat([]);
    toast.success('Chat cleared', {
      style: {
        borderRadius: '10px',
        background: '#1a1a1a',
        color: '#d1d1d1',
        border: '1px solid rgba(139, 92, 246, 0.3)',
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-headline gradient-text mb-4">AI Assistant</h1>
            <p className="text-muted-foreground">
              Get instant help and answers from our intelligent AI assistant
            </p>
          </div>
          
          <Card className="glass-card border-border/50">
            <CardHeader className="border-b border-border/30 flex flex-row items-center justify-between bg-card/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <MessageCircle className="text-primary w-5 h-5" />
                </div>
                <CardTitle className="text-foreground text-xl">Scroller AI</CardTitle>
              </div>
              {chat.length > 0 && !initializing && !initError && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearChat}
                  className="text-muted-foreground hover:text-foreground hover:bg-accent/50"
                >
                  Clear Chat
                </Button>
              )}
            </CardHeader>
            <CardContent className="p-6">
              {initializing ? (
                <div className="h-[400px] flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                    <p className="text-muted-foreground">Initializing AI service...</p>
                  </div>
                </div>
              ) : initError ? (
                <div className="h-[400px] flex items-center justify-center">
                  <div className="text-center space-y-4 p-6">
                    <CircleX className="h-12 w-12 text-destructive mx-auto" />
                    <div className="space-y-2">
                      <p className="text-destructive font-semibold">AI Service Error</p>
                      <p className="text-muted-foreground text-sm max-w-md">{initError}</p>
                      <Button
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        Retry
                      </Button>
                    </div>
                  </div>
                </div>
            ) : (
              <>
                <div
                  ref={scrollRef}
                  className="h-[400px] overflow-y-auto pr-2 space-y-4"
                >
                  {chat.length === 0 && (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center space-y-4 p-6">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <Bot className="h-8 w-8 text-primary" />
                        </div>
                        <div className="space-y-2">
                          <p className="text-foreground font-semibold">Welcome to Scroller AI</p>
                          <p className="text-muted-foreground text-sm max-w-md">
                            Ask me anything about social media wellness, productivity, or general questions!
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <AnimatePresence>
                    {chat.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: item.type === 'user' ? 50 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
                        className={`flex items-center ${
                          item.type === 'user' ? 'justify-end' : 'justify-start'
                        } space-x-2`}
                      >
                        {item.type === 'ai' && (
                          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                            <Bot className="text-primary h-4 w-4" />
                          </div>
                        )}
                        <div
                          className={`
                            p-3 rounded-xl max-w-[80%] shadow-sm
                            ${
                              item.type === 'user'
                                ? 'bg-primary/10 border border-primary/20 text-foreground'
                                : 'bg-card border border-border/50 text-foreground'
                            }
                          `}
                        >
                          {item.message}
                        </div>
                        {item.type === 'user' && (
                          <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                            <UserCircle className="text-accent h-4 w-4" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <div className="mt-6 flex space-x-2">
                  <Input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about social media wellness..."
                    disabled={loading || !model}
                    className="flex-grow bg-background border-border focus:border-primary"
                  />
                  <Button
                    onClick={handleSubmit}
                    disabled={loading || !prompt.trim() || !model}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <SendHorizontal className="mr-2 h-4 w-4" />
                    )}
                    Send
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;