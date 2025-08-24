'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Game } from "@/types/game";
import { Library, AlertCircle, Loader2 } from "lucide-react";

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

        {/* Loading */}
        <div className="flex items-center justify-center py-20">
          <div className="neu-inset p-8 rounded-full">
            <Loader2 className="h-16 w-16 text-primary animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">

        {/* Error */}
        <div className="flex items-center justify-center py-20">
          <Card className="neu-inset p-8 text-center max-w-md">
            <CardHeader>
              <div className="neu-pressed p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-destructive" />
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

      {/* Page Title */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="neu-inset p-8 text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Library className="h-10 w-10 text-primary" />
              Lista de Games
            </h1>
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
              <Card key={game.id} className="neu-raised overflow-hidden game-list-card">
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="md:w-80 w-full">
                    <div className="aspect-video md:aspect-square relative overflow-hidden bg-gradient-to-br from-muted/20 to-muted/40 game-card-image h-48 md:h-full">
                      <img
                        src={game.imgUrl}
                        alt={game.title}
                        className="max-w-full max-h-full object-contain rounded-lg"
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
