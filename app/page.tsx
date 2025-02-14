import { Newspaper, TrendingUp, Database, Sparkles, ExternalLink, Calendar, CheckCircle2, Zap, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { format, subDays } from "date-fns";

async function getLatestNews() {
  // This would be replaced with actual API call
  return [
    {
      id: 1,
      title: "🚀 OpenAI Secures $2B in Latest Funding Round",
      description: "Leading AI research company continues expansion with major investment from tech giants",
      category: "Funding",
      date: "2024-03-20",
      funding: "$2B",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 2,
      title: "⚡ AI Startup Revolution: Edge Computing Breakthrough",
      description: "New architecture enables 10x faster processing for AI models on edge devices",
      category: "Technology",
      date: "2024-03-19",
      funding: "$75M",
      image: "https://images.unsplash.com/photo-1676299081847-824916de7e0a?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 3,
      title: "🧬 DeepMind's Latest AI Model Shows Promise in Drug Discovery",
      description: "Breakthrough in protein folding prediction leads to pharmaceutical industry interest",
      category: "Research",
      date: "2024-03-18",
      funding: "$150M",
      image: "https://images.unsplash.com/photo-1677442139666-28937c5489d4?w=800&auto=format&fit=crop&q=60",
    },
  ];
}

export default async function Home() {
  const news = await getLatestNews();
  const today = new Date();
  const threeDaysAgo = subDays(today, 3);
  
  const dateRange = {
    start: format(threeDaysAgo, 'MMM d'),
    end: format(today, 'MMM d, yyyy')
  };

  return (
    <main className="min-h-screen bg-background">
      <nav className="border-b border-border/50 backdrop-blur-md fixed w-full z-50 bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Database className="h-6 w-6 text-primary animate-pulse" />
                <Sparkles className="h-3 w-3 text-primary absolute -top-1 -right-1" />
              </div>
              <span className="text-xl font-bold glow-text">BuilderzNews</span>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Simply Facts</span>
              </div>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Zap className="h-4 w-4 text-primary" />
                <span>100% Accurate</span>
              </div>
              <form className="flex items-center space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-48 px-3 py-1 text-sm rounded-lg bg-secondary border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
                <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center space-x-1">
                  <Mail className="h-3 w-3" />
                  <span>Subscribe</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 gap-12">
          {/* News Section */}
          <section className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-bold glow-text">Latest Startup News</h2>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Showing news from {dateRange.start} to {dateRange.end}</span>
              </div>
            </div>
            <div className="grid gap-6">
              {news.map((item) => (
                <Card 
                  key={item.id} 
                  className="gradient-card p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer border-border/50 overflow-hidden relative group"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3">
                      <div className="relative h-48 md:h-full rounded-lg overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-2/3 space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                            {item.title}
                            <ExternalLink className="h-4 w-4 inline ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h3>
                          <p className="text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Newspaper className="h-4 w-4 text-primary" />
                          <span className="text-primary">{item.category}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <time className="text-muted-foreground">{item.date}</time>
                          <span className="funding-badge px-3 py-1 rounded-full text-primary font-medium">
                            {item.funding}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>

      <footer className="border-t border-border/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-muted-foreground">
            © 2024 BuilderzNews.org - Keeping it real with AI-powered startup intel 🚀
          </div>
        </div>
      </footer>
    </main>
  );
}