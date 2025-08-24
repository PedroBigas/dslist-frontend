'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GameList } from "@/types/game";
import { 
  AlertCircle, 
  Loader2, 
  BookOpen, 
  Sword, 
  User, 
  Zap, 
  Trophy, 
  Car, 
  Puzzle, 
  Target, 
  Gamepad2, 
  Dice6 
} from "lucide-react";

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

      {/* Page Title */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="neu-inset p-8 text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <BookOpen className="h-10 w-10 text-primary" />
              Listas por Gênero
            </h1>
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
                    {getGenreIcon(list.name)}
                  </div>
                  <CardTitle className="text-2xl font-bold mb-4">{list.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center pb-8">
                  <Link href={`/lists/${list.id}/games`}>
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
                <BookOpen className="h-8 w-8 text-primary" />
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
function getGenreIcon(genreName: string): JSX.Element {
  const name = genreName.toLowerCase();
  const iconClass = "h-8 w-8 text-primary";
  
  if (name.includes('aventura') || name.includes('rpg')) {
    return <Sword className={iconClass} />;
  } else if (name.includes('plataforma')) {
    return <User className={iconClass} />;
  } else if (name.includes('ação') || name.includes('action')) {
    return <Zap className={iconClass} />;
  } else if (name.includes('esporte') || name.includes('sport')) {
    return <Trophy className={iconClass} />;
  } else if (name.includes('corrida') || name.includes('racing')) {
    return <Car className={iconClass} />;
  } else if (name.includes('puzzle') || name.includes('quebra')) {
    return <Puzzle className={iconClass} />;
  } else if (name.includes('estratégia') || name.includes('strategy')) {
    return <Target className={iconClass} />;
  } else if (name.includes('simulação') || name.includes('simulation')) {
    return <Gamepad2 className={iconClass} />;
  } else {
    return <Dice6 className={iconClass} />;
  }
}
