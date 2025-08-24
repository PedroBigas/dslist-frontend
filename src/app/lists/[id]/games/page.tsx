'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Game, GameList } from "@/types/game";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Componente para card arrastável
function SortableGameCard({ game }: { game: Game }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: game.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card 
      ref={setNodeRef} 
      style={style}
      className={`neu-raised hover:neu-pressed transition-all duration-300 overflow-hidden game-list-card cursor-grab active:cursor-grabbing ${
        isDragging ? 'shadow-2xl scale-105' : ''
      }`}
      {...attributes}
      {...listeners}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-80 w-full bg-gradient-to-br from-muted/20 to-muted/40 p-6">
          <div className="aspect-video md:aspect-square relative overflow-hidden game-card-image">
            <img
              src={game.imgUrl}
              alt={game.title}
              className="w-full h-full object-contain rounded-lg"
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
        <div className="flex-1 p-6 bg-card">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-2xl font-bold">{game.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <CardDescription className="text-base leading-relaxed mb-6">
              {game.shortDescription}
            </CardDescription>
            <div className="flex gap-3">
              <Link href={`/games/${game.id}`}>
                <Button 
                  variant="default" 
                  className="neu-raised"
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  Ver Detalhes
                </Button>
              </Link>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

export default function ListGamesPage() {
  const params = useParams();
  const router = useRouter();
  const listId = params.id as string;
  
  const [games, setGames] = useState<Game[]>([]);
  const [listInfo, setListInfo] = useState<GameList | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (listId) {
      fetchListGames(listId);
      fetchListInfo(listId);
    }
  }, [listId]);

  const fetchListGames = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://dslist-production-330e.up.railway.app/lists/${id}/games`);
      
      if (!response.ok) {
        throw new Error('Falha ao carregar os games da lista');
      }
      
      const data = await response.json();
      setGames(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const fetchListInfo = async (id: string) => {
    try {
      const response = await fetch(`https://dslist-production-330e.up.railway.app/lists`);
      
      if (response.ok) {
        const lists = await response.json();
        const currentList = lists.find((list: GameList) => list.id.toString() === id);
        if (currentList) {
          setListInfo(currentList);
        }
      }
    } catch (err) {
      // Se não conseguir buscar info da lista, não é crítico
      console.warn('Não foi possível carregar informações da lista');
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setGames((items) => {
        const oldIndex = items.findIndex((item) => item.id.toString() === active.id);
        const newIndex = items.findIndex((item) => item.id.toString() === over?.id);

        const newItems = arrayMove(items, oldIndex, newIndex);
        setHasChanges(true);
        return newItems;
      });
    }
  };

  const saveOrder = async () => {
    if (!hasChanges) return;

    try {
      setSaving(true);
      
      // Para simplificar, vamos recarregar a lista original e comparar
      const originalResponse = await fetch(`https://dslist-production-330e.up.railway.app/lists/${listId}/games`);
      if (!originalResponse.ok) {
        throw new Error('Falha ao carregar ordem original');
      }
      const originalGames = await originalResponse.json();
      
      // Encontrar mudanças de posição
      const changes = [];
      for (let newIndex = 0; newIndex < games.length; newIndex++) {
        const currentGame = games[newIndex];
        const originalIndex = originalGames.findIndex((g: Game) => g.id === currentGame.id);
        
        if (originalIndex !== newIndex && originalIndex !== -1) {
          changes.push({
            sourceIndex: originalIndex,
            destinationIndex: newIndex,
          });
        }
      }

      // Enviar mudanças para a API
      for (const change of changes) {
        const response = await fetch(
          `https://dslist-production-330e.up.railway.app/lists/${listId}/replacement`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(change),
          }
        );

        if (!response.ok) {
          throw new Error('Falha ao salvar a ordem');
        }
      }

      setHasChanges(false);
      // Recarregar a lista para garantir que está sincronizada
      await fetchListGames(listId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar ordem');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">


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
              <div className="flex gap-3 justify-center">
                <Button onClick={() => fetchListGames(listId)} className="neu-raised">
                  Tentar novamente
                </Button>
                <Button 
                  variant="outline" 
                  className="neu-flat hover:neu-pressed"
                  onClick={() => router.push('/lists')}
                >
                  Voltar às Listas
                </Button>
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

      {/* Breadcrumb */}
      <section className="py-4 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="neu-flat p-4 rounded-lg">
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>→</span>
              <Link href="/lists" className="hover:text-primary transition-colors">
                Listas
              </Link>
              <span>→</span>
              <span className="text-foreground font-medium">
                {listInfo?.name || `Lista ${listId}`}
              </span>
            </nav>
          </div>
        </div>
      </section>

      {/* Page Title */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="neu-inset p-8 text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              📋 {listInfo?.name || `Lista ${listId}`}
            </h1>
            <p className="text-xl text-muted-foreground">
              {games.length} {games.length === 1 ? 'jogo encontrado' : 'jogos encontrados'} nesta lista
            </p>
          </div>
        </div>
      </section>

      {/* Games List */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={games.map(game => game.id.toString())}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-6">
                {games.map((game) => (
                  <SortableGameCard key={game.id} game={game} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {hasChanges && (
              <Button 
                onClick={saveOrder}
                disabled={saving}
                className="neu-raised bg-green-600 hover:bg-green-700 text-white"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Salvando...
                  </>
                ) : (
                  <>
                    💾 Salvar Ordem
                  </>
                )}
              </Button>
            )}
            <Button 
              variant="outline" 
              className="neu-flat hover:neu-pressed"
              onClick={() => router.push('/lists')}
            >
              ← Voltar às Listas
            </Button>
          </div>
          
          {hasChanges && (
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                ⚠️ Você tem alterações não salvas na ordem dos games
              </p>
            </div>
          )}
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
              <CardTitle>Lista vazia</CardTitle>
              <CardDescription>
                Esta lista não possui jogos no momento.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="neu-flat hover:neu-pressed"
                onClick={() => router.push('/lists')}
              >
                Voltar às Listas
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
