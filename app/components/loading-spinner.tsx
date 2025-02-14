'use client';

import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="fixed bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-lg border border-border/10">
      <Loader2 className="h-6 w-6 text-primary animate-spin" />
    </div>
  );
} 