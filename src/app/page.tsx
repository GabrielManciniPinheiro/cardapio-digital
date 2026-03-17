import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-4xl font-black text-foreground uppercase tracking-tight">
          Cardápio Digital SaaS
        </h1>

        <p className="text-muted-foreground text-lg font-medium">
          Sistema online. Selecione um restaurante para visualizar.
        </p>

        <Link href="/camaleao-bar" className="block w-full">
          <Button
            size="lg"
            className="w-full text-sm font-bold uppercase tracking-widest bg-primary text-white hover:bg-primary/90"
          >
            Acessar Camaleão Bar
          </Button>
        </Link>
      </div>
    </main>
  );
}
