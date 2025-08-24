'use client';

import { useState, useEffect } from 'react';
import Header from './Header';

export default function ClientHeader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Renderizar um header básico durante SSR
    return (
      <header className="neu-flat p-6 m-4">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="neu-pressed p-3 rounded-full">
              <div className="h-6 w-6 bg-primary rounded"></div>
            </div>
            <div>
              <span className="text-2xl font-bold text-primary">DSList</span>
              <p className="text-sm text-muted-foreground">Sua lista de games</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-10 w-16 bg-muted rounded neu-flat"></div>
            <div className="h-10 w-16 bg-muted rounded neu-flat"></div>
            <div className="h-10 w-16 bg-muted rounded neu-flat"></div>
            <div className="h-10 w-10 bg-muted rounded neu-flat"></div>
          </div>
        </nav>
      </header>
    );
  }

  return <Header />;
}
