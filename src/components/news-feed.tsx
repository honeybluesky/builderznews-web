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
  publishedDate: string;
  lastModified: string;
  funding: string;
  fundingRound: string;
  companyName: string;
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
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentVCIndex, setCurrentVCIndex] = useState(0);
  const [shuffledVCFirms, setShuffledVCFirms] = useState<string[]>([]);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array: string[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    setShuffledVCFirms(shuffleArray(VC_FIRMS));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setCurrentVCIndex((prev) => (prev + 1) % shuffledVCFirms.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isLoading, shuffledVCFirms]);

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
        let allNews: NewsItem[] = [];
        let nextToken = null;
        let hasMore = true;
        
        // Calculate date 2 days ago for comparison
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
        twoDaysAgo.setHours(0, 0, 0, 0); // Start of the day
        
        // Initialize with first page request
        let url = 'https://wak4ubboy5.execute-api.us-east-1.amazonaws.com/recent_news?range=last_3_days&per_page=5';
        
        // Initial loading state
        setIsLoading(true);
        
        // Continue fetching pages while there are more results
        while (hasMore) {
          // Add the next token if we have one
          if (nextToken) {
            url = `https://wak4ubboy5.execute-api.us-east-1.amazonaws.com/recent_news?range=last_3_days&per_page=5&next_token=${encodeURIComponent(JSON.stringify(nextToken))}`;
            setIsLoadingMore(true);
          }
          
          const response = await fetch(url);
          const data = await response.json();
          
          // Check if we have items and if we've reached the 2-day limit
          let shouldStopFetching = false;
          
          // Transform current page of news items
          const pageNews = data.response.news_items
            .map((item: any, index: number) => {
              // Check if this item is older than 2 days
              const itemDate = new Date(item.published_date);
              if (itemDate < twoDaysAgo) {
                shouldStopFetching = true;
              }
              
              return {
                id: allNews.length + index + 1,
                companyName: item.company_name,
                title: item.original_content.length > 100 
                  ? item.original_content.substring(0, 100).trim() + '...'
                  : item.original_content.trim(),
                description: item.original_content,
                category: item.industry_focus,
                date: new Date(item.published_date).toISOString().split('T')[0],
                publishedDate: item.published_date,
                lastModified: item.last_modified,
                funding: item.funding_amount,
                fundingRound: item.funding_round,
                image: `https://images.unsplash.com/photo-${1676299081847 + (allNews.length + index)}-824916de7e0a?w=800&auto=format&fit=crop&q=60`,
                leadInvestors: item.lead_investors || [],
                sourceUrl: item.source_url
              };
            });
          
          // Filter out items older than 2 days
          const filteredPageNews = pageNews.filter((item: NewsItem) => {
            return new Date(item.publishedDate) >= twoDaysAgo;
          });
          
          // Add current page to all news
          if (filteredPageNews.length > 0) {
            allNews = [...allNews, ...filteredPageNews];
            
            // Sort all fetched news
            allNews.sort((a: NewsItem, b: NewsItem) => {
              // Sort by last_modified, newest first
              return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
            });
            
            // Update state to show results incrementally
            setNews([...allNews]);
            
            // If this is the first batch, exit loading state
            if (isLoading) {
              setIsLoading(false);
            }
            
            // If loading more, exit that state
            if (isLoadingMore) {
              setIsLoadingMore(false);
            }
            
            // Update cache
            sessionStorage.setItem('news', JSON.stringify(allNews));
            sessionStorage.setItem('newsTimestamp', Date.now().toString());
          }
          
          // Check if we should continue fetching
          hasMore = data.has_more && !shouldStopFetching && filteredPageNews.length > 0;
          nextToken = data.next_token;
          
          // Safety check - don't load more than 20 pages (100 items) to avoid potential infinite loops
          if (allNews.length >= 100) {
            break;
          }
        }
        
        // Ensure we exit loading states if we didn't get any news or if the loop exited
        setIsLoading(false);
        setIsLoadingMore(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setIsLoading(false);
        setIsLoadingMore(false);
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
                {shuffledVCFirms[currentVCIndex] || VC_FIRMS[0]}
              </p>
            </div>
            <p className="first-time-notice">
              Searching and organizing news for you, it may take 10-20 seconds, thank you for your patience...
            </p>
          </div>
        </div>
      ) : (
        <>
          {news.map((item) => (
            <Card 
              key={item.id} 
              className="gradient-card hover:scale-[1.01] transition-all duration-300 cursor-pointer overflow-hidden relative group animate-fade-in"
            >
              <div className="flex flex-col p-4 sm:p-6">
                <div className="w-full space-y-3">
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-semibold leading-tight line-clamp-1">
                      <a 
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors inline-flex items-center gap-2"
                      >
                        {item.title}
                        <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
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
                      <time className="text-white/50">
                        {new Date(item.lastModified).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </time>
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
                      {item.fundingRound && item.fundingRound !== "N/A" && (
                        <span className="funding-badge px-2.5 py-1 rounded-full text-primary font-medium text-sm bg-primary/10 whitespace-nowrap">
                          {item.fundingRound}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {isLoadingMore && (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 text-primary animate-spin" />
            </div>
          )}
        </>
      )}
    </div>
  );
} 