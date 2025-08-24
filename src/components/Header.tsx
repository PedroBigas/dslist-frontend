'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gamepad2, Home, List, Library, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function Header() {
  const pathname = usePathname();
  
  // Usar try-catch para lidar com contexto não disponível durante SSR
  let theme = 'light';
  let toggleTheme = () => {};
  
  try {
    const themeContext = useTheme();
    theme = themeContext.theme;
    toggleTheme = themeContext.toggleTheme;
  } catch (error) {
    // Contexto não disponível durante SSR, usar valores padrão
  }

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
              variant="ghost"
              className={isActive('/') ? "neu-pressed" : "neu-flat hover:opacity-80"}
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
          <Link href="/lists">
            <Button 
              variant="ghost"
              className={isActive('/lists') ? "neu-pressed" : "neu-flat hover:opacity-80"}
            >
              <List className="h-4 w-4 mr-2" />
              Listas
            </Button>
          </Link>
          <Link href="/games">
            <Button 
              variant="ghost"
              className={isActive('/games') ? "neu-pressed" : "neu-flat hover:opacity-80"}
            >
              <Library className="h-4 w-4 mr-2" />
              Games
            </Button>
          </Link>
          
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="neu-flat hover:neu-pressed"
            title={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
        </div>
      </nav>
    </header>
  );
}
