'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GameDetail } from "@/types/game";

export default function GameDetailPage() {
  const params = useParams();
  const router = useRouter();
  const gameId = params.id as string;
  
  const [game, setGame] = useState<GameDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (gameId) {
      fetchGameDetail(gameId);
    }
  }, [gameId]);

  const fetchGameDetail = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://dslist-production-330e.up.railway.app/games/${id}`);
      
      if (!response.ok) {
        throw new Error('Game não encontrado');
      }
      
      const data = await response.json();
      setGame(data);
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
              <Link href="/lists">
                <Button variant="ghost" className="neu-flat hover:neu-pressed">
                  Listas
                </Button>
              </Link>
              <Link href="/games">
                <Button variant="ghost" className="neu-flat hover:neu-pressed">
                  Games
                </Button>
              </Link>
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

  if (error || !game) {
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
              <Link href="/lists">
                <Button variant="ghost" className="neu-flat hover:neu-pressed">
                  Listas
                </Button>
              </Link>
              <Link href="/games">
                <Button variant="ghost" className="neu-flat hover:neu-pressed">
                  Games
                </Button>
              </Link>
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
              <CardTitle>Game não encontrado</CardTitle>
              <CardDescription>{error}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => fetchGameDetail(gameId)} className="neu-raised">
                  Tentar novamente
                </Button>
                <Link href="/games">
                  <Button variant="outline" className="neu-flat hover:neu-pressed">
                    Voltar à Lista
                  </Button>
                </Link>
              </div>
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
            <Link href="/games">
              <Button variant="ghost" className="neu-flat hover:neu-pressed">
                Games
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Breadcrumb */}
      <section className="py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="neu-flat p-4 rounded-lg">
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>→</span>
              <Link href="/games" className="hover:text-primary transition-colors">
                Games
              </Link>
              <span>→</span>
              <span className="text-foreground font-medium">{game.title}</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Game Detail */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="neu-raised overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-0">
              {/* Image Section */}
              <div className="lg:w-2/5 w-full bg-gradient-to-br from-muted/20 to-muted/40 p-6">
                <div className="aspect-video lg:aspect-square relative overflow-hidden game-card-image">
                  <img
                    src={game.imgUrl}
                    alt={game.title}
                    className="w-full h-full object-contain rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-game.png';
                    }}
                  />
                </div>
              </div>
              
              {/* Content Section */}
              <div className="flex-1 p-8 bg-card">
                <CardHeader className="p-0 pb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <CardTitle className="text-3xl font-bold mb-2">{game.title}</CardTitle>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <span className="neu-pressed px-3 py-1 rounded-full text-sm font-medium">
                          {game.year}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">⭐</span>
                          <span className="font-semibold">{game.score}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="neu-flat p-4 rounded-lg">
                      <h3 className="font-semibold mb-2 text-primary">🎯 Gênero</h3>
                      <p className="text-sm">{game.genre}</p>
                    </div>
                    <div className="neu-flat p-4 rounded-lg">
                      <h3 className="font-semibold mb-2 text-primary">🎮 Plataformas</h3>
                      <p className="text-sm">{game.platforms}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">📝 Resumo</h3>
                      <CardDescription className="text-base leading-relaxed mb-4 font-medium">
                        {game.shortDescription}
                      </CardDescription>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">📖 Descrição Completa</h3>
                      <CardDescription className="text-base leading-relaxed">
                        {game.longDescription}
                      </CardDescription>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Button 
                        variant="outline" 
                        className="neu-flat hover:neu-pressed"
                        onClick={() => router.push('/games')}
                      >
                        ← Voltar à Lista
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
