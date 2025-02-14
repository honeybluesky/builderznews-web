import { Toaster } from 'sonner'
import { NewsFeed } from './components/news-feed'
import { Sparkles, Calendar, CheckCircle2, Mail, Twitter } from "lucide-react";
import { format, subDays } from "date-fns";

function App() {
  const today = new Date();
  const threeDaysAgo = subDays(today, 3);
  
  const dateRange = {
    start: format(threeDaysAgo, 'MMM d'),
    end: format(today, 'MMM d, yyyy')
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
          <div className="flex items-center justify-between h-full">
            {/* Logo and Social */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src="/logo_400x400.jpg"
                  alt="BuilderzNews Logo"
                  className="w-10 h-10 rounded-full ring-2 ring-primary/20 hover:ring-primary/40 transition-all shadow-lg"
                />
                <Sparkles className="h-4 w-4 text-primary absolute -top-1 -right-1" />
              </div>
              <h1 className="text-base sm:text-lg font-semibold tracking-tight hidden sm:block">
                Stay Updated with <span className="text-primary">BuilderZ</span> News
              </h1>
              <div className="hidden lg:flex items-center space-x-6 ml-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-white/80">Free Forever</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-white/80">48 VC Sources</span>
                </div>
              </div>
              <a 
                href="https://twitter.com/builderznews" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full hover:bg-primary/10 text-primary transition-all group"
              >
                <Twitter className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium hidden sm:inline">Follow us</span>
              </a>
            </div>

            {/* Subscribe Form */}
            <form className="flex items-center space-x-2">
              <input
                type="email"
                placeholder="Subscribe to newsletter"
                className="w-48 sm:w-64 px-4 py-1.5 text-sm rounded-full bg-white/5 text-foreground border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-white/40"
              />
              <button className="px-4 py-1.5 text-sm bg-primary text-white rounded-full font-medium hover:opacity-90 transition-opacity flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">Subscribe</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-32">
        <div className="absolute inset-0 h-[300px] sm:h-[500px] overflow-hidden">
          <img
            src="/1500x250.png"
            alt="BuilderzNews Hero"
            className="w-full h-full object-contain opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32">
          <div className="max-w-2xl">
            {/* Empty hero section - you can add new content here if needed */}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="bg-card/30 backdrop-blur-lg rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center space-x-3 text-base sm:text-lg mb-8">
            <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <span className="font-medium text-white/90">
              News from <span className="text-primary">{dateRange.start}</span> to <span className="text-primary">{dateRange.end}</span>
            </span>
          </div>
          <NewsFeed />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-white/60">
            <p className="font-medium">© 2024 BuilderzNews. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <Toaster />
    </div>
  )
}

export default App 