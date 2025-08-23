'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Game } from "@/types/game";

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
            <h1 className="text-4xl font-bold mb-4">📋 Lista de Games</h1>
            <p className="text-xl text-muted-foreground">
              Explore nossa coleção completa de {games.length} jogos incríveis
            </p>
          </div>
        </div>
      </section>

      {/* Games List */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-6">
            {games.map((game) => (
              <Card key={game.id} className="neu-raised hover:neu-pressed transition-all duration-300 overflow-hidden game-list-card">
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="md:w-80 w-full">
                    <div className="aspect-video md:aspect-square relative overflow-hidden bg-gradient-to-br from-muted/20 to-muted/40 game-card-image h-48 md:h-full">
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
                  </div>
                  
                  {/* Content Section */}
                  <div className="flex-1 p-6">
                    <CardHeader className="p-0 pb-4">
                      <CardTitle className="text-2xl font-bold">{game.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <CardDescription className="text-base leading-relaxed mb-6">
                        {game.shortDescription}
                      </CardDescription>
                      <div className="flex gap-3">
                        <Link href={`/games/${game.id}`}>
                          <Button variant="default" className="neu-raised">
                            Ver Detalhes
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </div>
                </div>
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
