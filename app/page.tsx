import { TrendingUp, Sparkles, Calendar, CheckCircle2, Zap, Mail, Search, Twitter } from "lucide-react";
import Image from "next/image";
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
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Image
                    src="/logo_400x400.jpg"
                    alt="BuilderzNews Logo"
                    width={88}
                    height={88}
                    className="rounded-full ring-3 ring-primary/20 hover:ring-primary/40 transition-all shadow-lg"
                    priority
                  />
                  <Sparkles className="h-7 w-7 text-primary absolute -top-2 -right-2" />
                </div>
                <a 
                  href="https://twitter.com/builderznews" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-secondary/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all group"
                >
                  <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium hidden md:inline">Follow us</span>
                </a>
              </div>
              <form className="flex items-center space-x-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-40 md:w-56 px-4 py-2 text-sm rounded-full bg-secondary text-foreground border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground"
                />
                <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span className="hidden md:inline">Subscribe</span>
                </button>
              </form>
            </div>
            <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-6">
              <div className="flex items-center space-x-1.5 text-muted-foreground hover:text-foreground transition-colors">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Free Forever. We help builder community.</span>
              </div>
              <div className="flex items-center space-x-1.5 text-muted-foreground hover:text-foreground transition-colors">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Verified sources from 48 Partnered VC</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-52 md:pt-44 pb-16">
        <div className="grid grid-cols-1 gap-12">
          <section className="space-y-8 animate-fade-in">
            <div className="flex items-center space-x-3 text-base md:text-lg bg-gradient-to-r from-background/95 to-background/80 backdrop-blur-sm py-3 px-5 rounded-2xl shadow-lg border border-border/20 hover:border-primary/20 transition-all">
              <Calendar className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              <span className="font-medium">Showing news from <span className="text-primary">{dateRange.start}</span> to <span className="text-primary">{dateRange.end}</span></span>
            </div>
            <NewsFeed />
          </section>
        </div>
      </div>

      <footer className="border-t border-border/10 mt-16 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p className="font-medium">© 2024 BuilderzNews</p>
          </div>
        </div>
      </footer>
    </main>
  );
}