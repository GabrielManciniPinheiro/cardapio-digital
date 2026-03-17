"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { logoutAction } from "./actions";
import { useRouter, useParams } from "next/navigation";
import { useTransition } from "react";

export function LogoutButton() {
  const router = useRouter();
  const params = useParams(); // Pega o slug da URL automaticamente
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
      // Forçamos o refresh para o Middleware limpar o estado e redirecionamos
      router.refresh();
      router.push(`/${params.slug}/login`);
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      disabled={isPending}
      className="text-muted-foreground hover:text-red-600 gap-2 font-medium transition-colors"
    >
      <LogOut className="w-4 h-4" />
      {isPending ? "Saindo..." : "Sair"}
    </Button>
  );
}
