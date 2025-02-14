'use client';

import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Newspaper, ExternalLink, Loader2 } from "lucide-react";

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

interface DateRange {
  start: string;
  end: string;
}

interface NewsFeedProps {
  dateRange: DateRange;
}

export function NewsFeed({ dateRange }: NewsFeedProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
            setIsLoading(false);
            return;
          }
        }

        // If no valid cache, fetch new data
        const response = await fetch('https://wak4ubboy5.execute-api.us-east-1.amazonaws.com/recent_news?range=last_2_weeks');
        const data = await response.json();
        
        // Transform the API response to match our UI structure
        const transformedData = data.response.news_items.map((item: any, index: number) => ({
          id: index + 1,
          title: `${item.company_name} Secures ${item.funding_amount} in ${item.funding_round}`,
          description: item.original_content,
          category: item.industry_focus,
          date: new Date(item.published_date).toISOString().split('T')[0],
          funding: item.funding_amount,
          image: `https://images.unsplash.com/photo-${1676299081847 + index}-824916de7e0a?w=800&auto=format&fit=crop&q=60`,
          leadInvestors: item.lead_investors,
          sourceUrl: item.source_url
        }));
        
        // Update state and cache
        setNews(transformedData);
        sessionStorage.setItem('news', JSON.stringify(transformedData));
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
    <div className="grid gap-6">
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-full p-4 shadow-lg border border-white/10">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        </div>
      ) : (
        news.map((item) => (
          <Card 
            key={item.id} 
            className="gradient-card hover:scale-[1.01] transition-all duration-300 cursor-pointer overflow-hidden relative group animate-fade-in"
          >
            <div className="flex flex-col md:flex-row gap-8 p-6">
              <div className="w-full md:w-1/3">
                <div className="relative h-48 md:h-full rounded-xl overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                </div>
              </div>
              <div className="w-full md:w-2/3 space-y-4">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                    {item.title}
                    <ExternalLink className="h-4 w-4 inline ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-white/70 text-base leading-relaxed">{item.description}</p>
                </div>
                <div className="flex items-center justify-between text-sm pt-2">
                  <div className="flex items-center space-x-2">
                    <Newspaper className="h-4 w-4 text-primary" />
                    <span className="text-primary font-medium">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <time className="text-white/50">{item.date}</time>
                    <span className="funding-badge px-3 py-1 rounded-full text-primary font-medium">
                      {item.leadInvestors.join(', ')}
                    </span>
                    {item.funding !== "Not specified" && (
                      <span className="funding-badge px-3 py-1 rounded-full text-primary font-medium">
                        {item.funding}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
} 