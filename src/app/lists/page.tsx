'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GameList } from "@/types/game";

export default function ListsPage() {
  const [lists, setLists] = useState<GameList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dslist-production-330e.up.railway.app/lists');
      
      if (!response.ok) {
        throw new Error('Falha ao carregar as listas');
      }
      
      const data = await response.json();
      setLists(data);
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
              <Button variant="default" className="neu-pressed">
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
              <Button variant="default" className="neu-pressed">
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

        {/* Error */}
        <div className="flex items-center justify-center py-20">
          <Card className="neu-inset p-8 text-center max-w-md">
            <CardHeader>
              <div className="neu-pressed p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">❌</span>
              </div>
              <CardTitle>Erro ao carregar listas</CardTitle>
              <CardDescription>{error}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={fetchLists} className="neu-raised">
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
            <Button variant="default" className="neu-pressed">
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

      {/* Page Title */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="neu-inset p-8 text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">📋 Listas por Gênero</h1>
            <p className="text-xl text-muted-foreground">
              Explore games organizados por categorias e gêneros
            </p>
          </div>
        </div>
      </section>

      {/* Lists Grid */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lists.map((list) => (
              <Card key={list.id} className="neu-raised hover:neu-pressed transition-all duration-300 cursor-pointer group">
                <CardHeader className="text-center p-8">
                  <div className="neu-pressed p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">
                      {getGenreIcon(list.name)}
                    </span>
                  </div>
                  <CardTitle className="text-2xl font-bold mb-3">{list.name}</CardTitle>
                  <CardDescription className="text-base mb-6">
                    Descubra uma seleção especial de jogos do gênero {list.name.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center pb-8">
                  <Link href={`/lists/${list.id}`}>
                    <Button className="neu-raised w-full group-hover:scale-105 transition-transform duration-300">
                      Explorar Lista
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Empty State */}
      {lists.length === 0 && !loading && !error && (
        <div className="flex items-center justify-center py-20">
          <Card className="neu-inset p-8 text-center max-w-md">
            <CardHeader>
              <div className="neu-pressed p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
              <CardTitle>Nenhuma lista encontrada</CardTitle>
              <CardDescription>
                Não foi possível encontrar listas no momento.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      )}
    </div>
  );
}

// Função auxiliar para retornar ícones baseados no nome do gênero
function getGenreIcon(genreName: string): string {
  const name = genreName.toLowerCase();
  
  if (name.includes('aventura') || name.includes('rpg')) {
    return '⚔️';
  } else if (name.includes('plataforma')) {
    return '🏃';
  } else if (name.includes('ação') || name.includes('action')) {
    return '💥';
  } else if (name.includes('esporte') || name.includes('sport')) {
    return '⚽';
  } else if (name.includes('corrida') || name.includes('racing')) {
    return '🏎️';
  } else if (name.includes('puzzle') || name.includes('quebra')) {
    return '🧩';
  } else if (name.includes('estratégia') || name.includes('strategy')) {
    return '🎯';
  } else if (name.includes('simulação') || name.includes('simulation')) {
    return '🎮';
  } else {
    return '🎲';
  }
}
