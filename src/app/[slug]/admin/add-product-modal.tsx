"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { createProductAction } from "./actions";

export function AddProductModal({
  categories,
  restaurantId,
  slug,
}: {
  categories: { id: string; name: string }[];
  restaurantId: string;
  slug: string;
}) {
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const actionSubmit = async (formData: FormData) => {
    setIsUploading(true);
    await createProductAction(formData);
    setIsUploading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <PlusCircle className="w-5 h-5" />
          Novo Produto
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-112.5 bg-background">
        <DialogHeader>
          <DialogTitle className="text-xl">Adicionar Novo Produto</DialogTitle>
        </DialogHeader>

        <form action={actionSubmit} className="grid gap-4 py-4">
          <input type="hidden" name="restaurantId" value={restaurantId} />
          <input type="hidden" name="slug" value={slug} />

          <div className="grid gap-2">
            <label className="text-sm font-semibold">Nome do Produto</label>
            <input
              required
              name="name"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              placeholder="Ex: Porção de Fritas"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold">Categoria</label>
            <select
              required
              name="categoryId"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <option value="">Selecione a categoria...</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-semibold">Preço (R$)</label>
              <input
                required
                name="basePrice"
                step="0.01"
                type="number"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                placeholder="29.90"
              />
            </div>

            {/* O SEGREDO ESTÁ AQUI: Input do tipo file */}
            <div className="grid gap-2">
              <label className="text-sm font-semibold">Foto do Prato</label>
              <input
                name="imageFile"
                type="file"
                accept="image/png, image/jpeg, image/webp"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold">Descrição do Prato</label>
            <textarea
              required
              name="description"
              className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              placeholder="Ingredientes, tamanho da porção, etc."
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={isUploading}
              className="bg-primary text-white w-full sm:w-auto"
            >
              {isUploading
                ? "Salvando e enviando imagem..."
                : "Salvar no Cardápio"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
