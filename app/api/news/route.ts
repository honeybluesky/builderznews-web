import { NextResponse } from 'next/server';

interface NewsItem {
  company_name: string;
  published_date: string;
  funding_amount: string;
  funding_round: string;
  lead_investors: string[];
  industry_focus: string;
  original_content: string;
  source_url: string;
  last_modified: string;
}

interface APIResponse {
  number_of_results: number;
  response: {
    feed_date: string;
    feed_title: string;
    news_items: NewsItem[];
  };
}

export async function GET() {
  try {
    const apiUrl = 'https://wak4ubboy5.execute-api.us-east-1.amazonaws.com/recent_news?range=last_2_weeks';
    const response = await fetch(apiUrl, {
      method: 'GET',
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.status} ${response.statusText}`);
    }

    const rawData: APIResponse = await response.json();
    
    // Transform the API response to match our UI structure
    const transformedData = rawData.response.news_items.map((item: NewsItem, index: number) => ({
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

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error in /api/news:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
} 