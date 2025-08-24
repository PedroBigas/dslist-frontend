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


    </div>
  );
}