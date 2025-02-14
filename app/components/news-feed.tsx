'use client';

import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Newspaper, ExternalLink } from "lucide-react";
import { LoadingSpinner } from './loading-spinner';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  funding: string;
  image: string;
  leadInvestors: string[];
  sourceUrl: string;
}

export function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Try to get from session storage first
        const cachedNews = sessionStorage.getItem('news');
        const cachedTimestamp = sessionStorage.getItem('newsTimestamp');
        
        // Check if we have valid cached data less than 1 hour old
        if (cachedNews && cachedTimestamp) {
          const timestamp = parseInt(cachedTimestamp);
          if (Date.now() - timestamp < 3600000) { // 1 hour
            setNews(JSON.parse(cachedNews));
            return;
          }
        }

        // If no valid cache, fetch new data
        setIsLoading(true);
        const response = await fetch('/api/news');
        const data = await response.json();
        
        // Update state and cache
        setNews(data);
        sessionStorage.setItem('news', JSON.stringify(data));
        sessionStorage.setItem('newsTimestamp', Date.now().toString());
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <div className="grid gap-8">
        {news.map((item) => (
          <Card 
            key={item.id} 
            className="gradient-card p-6 hover:scale-[1.01] transition-all duration-300 cursor-pointer border-border/10 overflow-hidden relative group animate-fade-in"
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3">
                <div className="relative h-56 md:h-full rounded-xl overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                </div>
              </div>
              <div className="w-full md:w-2/3 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold leading-tight group-hover:text-primary transition-colors">
                    {item.title}
                    <ExternalLink className="h-5 w-5 inline ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{item.description}</p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Newspaper className="h-4 w-4 text-primary" />
                    <span className="text-primary font-medium">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <time className="text-muted-foreground">{item.date}</time>
                    <span className="funding-badge px-4 py-1.5 rounded-full text-primary font-medium">
                      {item.funding}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {isLoading && <LoadingSpinner />}
    </>
  );
} 