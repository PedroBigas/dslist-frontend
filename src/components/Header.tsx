'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gamepad2, Home, List, Library } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="neu-flat p-6 m-4">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <div className="neu-pressed p-3 rounded-full">
            <Gamepad2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">DSList</h1>
            <p className="text-sm text-muted-foreground">Sua lista de games</p>
          </div>
        </Link>
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Button 
              variant="ghost"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/') 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              }`}
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
          <Link href="/lists">
            <Button 
              variant="ghost"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/lists') 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              }`}
            >
              <List className="h-4 w-4 mr-2" />
              Listas
            </Button>
          </Link>
          <Link href="/games">
            <Button 
              variant="ghost"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/games') 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              }`}
            >
              <Library className="h-4 w-4 mr-2" />
              Games
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
