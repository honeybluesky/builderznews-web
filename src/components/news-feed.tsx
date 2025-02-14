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

const VC_FIRMS = [
  "Sequoia Capital",
  "Andreessen Horowitz (a16z)",
  "Lightspeed Venture Partners",
  "Accel",
  "Benchmark",
  "Kleiner Perkins",
  "Greylock Partners",
  "Bessemer Venture Partners",
  "General Catalyst",
  "Index Ventures",
  "Union Square Ventures",
  "GV (Google Ventures)",
  "Founders Fund",
  "New Enterprise Associates (NEA)",
  "Institutional Venture Partners (IVP)",
  "Battery Ventures",
  "Redpoint Ventures",
  "Menlo Ventures",
  "Draper Fisher Jurvetson (DFJ)",
  "Sapphire Ventures",
  "Insight Partners",
  "Norwest Venture Partners",
  "DCM Ventures",
  "Matrix Partners",
  "Khosla Ventures",
  "Madrona Venture Group",
  "Upfront Ventures",
  "True Ventures",
  "Felicis Ventures",
  "Charles River Ventures (CRV)",
  "8VC",
  "GGV Capital"
];

export function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentVCIndex, setCurrentVCIndex] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setCurrentVCIndex((prev) => (prev + 1) % VC_FIRMS.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

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
        <div className="flex flex-col items-center justify-center py-12">
          <div className="loading-container rounded-2xl p-8 w-full max-w-md text-center space-y-4">
            <div className="flex items-center justify-center mb-6">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
            <div className="h-16 flex items-center justify-center">
              <p className="loading-text text-lg font-medium text-primary">
                {VC_FIRMS[currentVCIndex]}
              </p>
            </div>
            <p className="first-time-notice">
              It may take 10-20 seconds for the first time loading
            </p>
          </div>
        </div>
      ) : (
        news.map((item) => (
          <Card 
            key={item.id} 
            className="gradient-card hover:scale-[1.01] transition-all duration-300 cursor-pointer overflow-hidden relative group animate-fade-in"
          >
            <div className="flex flex-col p-4 sm:p-6">
              <div className="w-full space-y-3">
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-semibold leading-tight">
                    <a 
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors inline-flex items-center gap-2"
                    >
                      {item.title}
                      <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </h3>
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-3 overflow-hidden relative">
                    {item.description}
                    <span className="absolute bottom-0 right-0 w-full h-6 bg-gradient-to-t from-background to-transparent" />
                  </p>
                </div>
                <div className="flex flex-col gap-3 text-sm pt-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Newspaper className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-primary font-medium">{item.category}</span>
                    </div>
                    <time className="text-white/50">{item.date}</time>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.leadInvestors.map((investor, index) => (
                      <span key={index} className="funding-badge px-2.5 py-1 rounded-full text-primary font-medium text-sm bg-primary/10 whitespace-nowrap">
                        {investor}
                      </span>
                    ))}
                    {item.funding !== "Not specified" && (
                      <span className="funding-badge px-2.5 py-1 rounded-full text-primary font-medium text-sm bg-primary/10 whitespace-nowrap">
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