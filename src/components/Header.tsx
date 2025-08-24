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
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button 
              variant={isActive('/') ? "default" : "ghost"} 
              className={isActive('/') ? "neu-pressed" : "neu-flat hover:opacity-80"}
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
          <Link href="/lists">
            <Button 
              variant={isActive('/lists') ? "default" : "ghost"} 
              className={isActive('/lists') ? "neu-pressed" : "neu-flat hover:opacity-80"}
            >
              <List className="h-4 w-4 mr-2" />
              Listas
            </Button>
          </Link>
          <Link href="/games">
            <Button 
              variant={isActive('/games') ? "default" : "ghost"} 
              className={isActive('/games') ? "neu-pressed" : "neu-flat hover:opacity-80"}
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
