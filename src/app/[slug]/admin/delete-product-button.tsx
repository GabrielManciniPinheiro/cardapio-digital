"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle } from "lucide-react";
import { deleteProductAction } from "./actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DeleteProductButton({
  id,
  slug,
}: {
  id: string;
  slug: string;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteProductAction(id, slug);
      setOpen(false); // Fecha o modal lindamente após a exclusão
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-red-600 hover:border-red-200 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px] bg-background">
        {/* Cabeçalho centralizado com ícone de alerta */}
        <DialogHeader className="flex flex-col items-center gap-3 pt-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <DialogTitle className="text-xl">Excluir Produto?</DialogTitle>
          <DialogDescription className="text-center">
            Essa ação não pode ser desfeita. O produto será removido
            permanentemente do cardápio do seu restaurante.
          </DialogDescription>
        </DialogHeader>

        {/* Rodapé com os botões de ação */}
        <DialogFooter className="flex sm:justify-center gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="w-full sm:w-auto bg-red-600 text-white hover:bg-red-700"
          >
            {isPending ? "Excluindo..." : "Sim, excluir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
