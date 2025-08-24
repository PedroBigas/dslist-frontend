import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Gamepad2, Rocket, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="neu-inset p-8 mb-12">
            <div className="neu-pressed p-6 rounded-full inline-block mb-6">
              <Gamepad2 className="h-16 w-16 text-primary" />
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
                  <Rocket className="h-5 w-5 mr-2" />
                  Explorar Games
                </Button>
              </Link>
              <Link href="/lists">
                <Button variant="outline" className="neu-flat text-lg px-8 py-3">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Ver Listas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}