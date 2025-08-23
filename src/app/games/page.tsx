'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Game {
  id: number;
  title: string;
  year: number;
  imgUrl: string;
  shortDescription: string;
}

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dslist-production-330e.up.railway.app/games');
      
      if (!response.ok) {
        throw new Error('Falha ao carregar os games');
      }
      
      const data = await response.json();
      setGames(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        {/* Header */}
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
                <Button variant="ghost" className="neu-flat hover:neu-pressed">
                  Home
                </Button>
              </Link>
              <Button variant="ghost" className="neu-flat hover:neu-pressed">
                Listas
              </Button>
              <Button variant="default" className="neu-pressed">
                Games
              </Button>
            </div>
          </nav>
        </header>

        {/* Loading */}
        <div className="flex items-center justify-center py-20">
          <div className="neu-inset p-8 rounded-full">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        {/* Header */}
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
                <Button variant="ghost" className="neu-flat hover:neu-pressed">
                  Home
                </Button>
              </Link>
              <Button variant="ghost" className="neu-flat hover:neu-pressed">
                Listas
              </Button>
              <Button variant="default" className="neu-pressed">
                Games
              </Button>
            </div>
          </nav>
        </header>

        {/* Error */}
        <div className="flex items-center justify-center py-20">
          <Card className="neu-inset p-8 text-center max-w-md">
            <CardHeader>
              <div className="neu-pressed p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">❌</span>
              </div>
              <CardTitle>Erro ao carregar games</CardTitle>
              <CardDescription>{error}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={fetchGames} className="neu-raised">
                Tentar novamente
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
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
              <Button variant="ghost" className="neu-flat hover:neu-pressed">
                Home
              </Button>
            </Link>
            <Button variant="ghost" className="neu-flat hover:neu-pressed">
              Listas
            </Button>
            <Button variant="default" className="neu-pressed">
              Games
            </Button>
          </div>
        </nav>
      </header>

      {/* Page Title */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="neu-inset p-8 text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">🎮 Catálogo de Games</h1>
            <p className="text-xl text-muted-foreground">
              Descubra uma incrível coleção de {games.length} jogos
            </p>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {games.map((game) => (
              <Card key={game.id} className="neu-raised hover:neu-pressed transition-all duration-300 overflow-hidden">
                <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-muted/20 to-muted/40 rounded-t-lg game-card-image">
                  <img
                    src={game.imgUrl}
                    alt={game.title}
                    className="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-105 rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-game.png';
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <span className="neu-pressed px-3 py-1 rounded-full text-sm font-medium">
                      {game.year}
                    </span>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-2">{game.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="line-clamp-3 mb-4">
                    {game.shortDescription}
                  </CardDescription>
                  <Button variant="outline" className="w-full neu-flat hover:neu-pressed">
                    Ver Detalhes
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Empty State */}
      {games.length === 0 && !loading && !error && (
        <div className="flex items-center justify-center py-20">
          <Card className="neu-inset p-8 text-center max-w-md">
            <CardHeader>
              <div className="neu-pressed p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎮</span>
              </div>
              <CardTitle>Nenhum game encontrado</CardTitle>
              <CardDescription>
                Não foi possível encontrar jogos no momento.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      )}
    </div>
  );
}
