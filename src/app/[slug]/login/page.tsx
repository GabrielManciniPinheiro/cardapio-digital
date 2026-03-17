import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loginAction } from "./actions";

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { slug } = await params;
  const { error } = await searchParams;

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col justify-center items-center p-4 selection:bg-primary/20">
      <div className="w-full max-w-md bg-background rounded-3xl border border-border shadow-xl p-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Acesso Restrito
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Digite a senha para gerenciar o cardápio
          </p>
        </div>

        <form action={loginAction} className="flex flex-col gap-5">
          <input type="hidden" name="slug" value={slug} />

          <div className="flex flex-col gap-2">
            <input
              type="password"
              name="password"
              required
              placeholder="Sua senha de administrador..."
              className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
            />
            {error && (
              <p className="text-sm text-red-500 font-medium ml-1 animate-in slide-in-from-top-1">
                Senha incorreta. Tente novamente.
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="h-12 rounded-xl text-base font-semibold"
          >
            Entrar no Painel
          </Button>
        </form>
      </div>
    </div>
  );
}
