import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="neu-flat p-6 m-4">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="neu-pressed p-3 rounded-full">
              <span className="text-2xl">🎮</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">DSList</h1>
              <p className="text-sm text-muted-foreground">Sua lista de games</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="default" className="neu-pressed">
              Home
            </Button>
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

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="neu-inset p-8 mb-12">
            <div className="neu-pressed p-6 rounded-full inline-block mb-6">
              <span className="text-6xl">🎮</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bem-vindo ao <span className="text-primary">DSList</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Descubra, organize e explore uma vasta coleção de games. Crie
              suas próprias listas personalizadas e compartilhe suas
              descobertas.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/games">
                <Button className="neu-raised text-lg px-8 py-3">
                  🚀 Explorar Games
                </Button>
              </Link>
              <Link href="/lists">
                <Button variant="outline" className="neu-flat text-lg px-8 py-3">
                  📋 Ver Listas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="neu-raised p-6 text-center">
              <CardHeader>
                <div className="neu-pressed p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <CardTitle>Games Incríveis</CardTitle>
                <CardDescription>
                  Explore uma biblioteca diversificada de games
                  de todas as plataformas e gêneros.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="neu-raised p-6 text-center">
              <CardHeader>
                <div className="neu-pressed p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📋</span>
                </div>
                <CardTitle>Listas Personalizadas</CardTitle>
                <CardDescription>
                  Crie e organize suas próprias listas de games
                  favoritos.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="neu-raised p-6 text-center">
              <CardHeader>
                <div className="neu-pressed p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <CardTitle>Experiência Moderna</CardTitle>
                <CardDescription>
                  Interface elegante com design Neumorfismo
                  para uma experiência única.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="neu-inset p-8 text-center">
            <h2 className="text-3xl font-bold mb-8">Estatísticas</h2>
            <p className="text-muted-foreground mb-8">
              Números impressionantes da nossa plataforma
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="neu-flat p-6">
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <div className="text-sm text-muted-foreground">Games</div>
              </div>
              <div className="neu-flat p-6">
                <div className="text-3xl font-bold text-primary mb-2">10+</div>
                <div className="text-sm text-muted-foreground">Categorias</div>
              </div>
              <div className="neu-flat p-6">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Disponível</div>
              </div>
              <div className="neu-flat p-6">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Gratuito</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}