'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
            <span className="text-2xl">🎮</span>
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
              className={isActive('/') ? "neu-pressed" : "neu-flat hover:neu-pressed"}
            >
              Home
            </Button>
          </Link>
          <Link href="/lists">
            <Button 
              variant={isActive('/lists') ? "default" : "ghost"} 
              className={isActive('/lists') ? "neu-pressed" : "neu-flat hover:neu-pressed"}
            >
              Listas
            </Button>
          </Link>
          <Link href="/games">
            <Button 
              variant={isActive('/games') ? "default" : "ghost"} 
              className={isActive('/games') ? "neu-pressed" : "neu-flat hover:neu-pressed"}
            >
              Games
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
