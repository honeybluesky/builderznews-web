import { TrendingUp, Database, Sparkles, Calendar, CheckCircle2, Zap, Mail, Search } from "lucide-react";
import { format, subDays } from "date-fns";
import { NewsFeed } from "./components/news-feed";

export default function Home() {
  const today = new Date();
  const threeDaysAgo = subDays(today, 3);
  
  const dateRange = {
    start: format(threeDaysAgo, 'MMM d'),
    end: format(today, 'MMM d, yyyy')
  };

  return (
    <main className="min-h-screen bg-background">
      <nav className="border-b border-border/10 backdrop-blur-xl fixed w-full z-50 bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Database className="h-7 w-7 text-primary animate-pulse" />
                <Sparkles className="h-4 w-4 text-primary absolute -top-1 -right-1" />
              </div>
              <span className="text-2xl font-bold tracking-tight glow-text">BuilderzNews</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search news..."
                  className="w-64 px-4 py-2 pl-10 text-sm rounded-full bg-secondary/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
                <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-1.5 text-muted-foreground hover:text-foreground transition-colors">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Verified Sources</span>
                </div>
                <div className="flex items-center space-x-1.5 text-muted-foreground hover:text-foreground transition-colors">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Real-time Updates</span>
                </div>
              </div>
              <form className="flex items-center space-x-2">
                <input
                  type="email"
                  placeholder="Subscribe to newsletter"
                  className="w-56 px-4 py-2 text-sm rounded-full bg-secondary/50 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
                <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Subscribe</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="grid grid-cols-1 gap-12">
          <section className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h2 className="text-4xl font-bold tracking-tight">Latest Startup News</h2>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Showing news from {dateRange.start} to {dateRange.end}</span>
              </div>
            </div>
            <NewsFeed />
          </section>
        </div>
      </div>

      <footer className="border-t border-border/10 mt-16 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p className="font-medium">© 2024 BuilderzNews</p>
            <p className="mt-2">Delivering accurate, real-time startup intelligence powered by AI</p>
          </div>
        </div>
      </footer>
    </main>
  );
}