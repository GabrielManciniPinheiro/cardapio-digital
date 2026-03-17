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
import { Pencil } from "lucide-react";
import { updateProductAction } from "./actions";

interface ProductPayload {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  imageUrl: string;
  categoryId: string;
}

interface CategoryPayload {
  id: string;
  name: string;
}

interface EditProductModalProps {
  product: ProductPayload;
  categories: CategoryPayload[];
  slug: string;
}

export function EditProductModal({
  product,
  categories,
  slug,
}: EditProductModalProps) {
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const actionSubmit = async (formData: FormData) => {
    setIsUploading(true);
    await updateProductAction(formData);
    setIsUploading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-primary"
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px] bg-background">
        <DialogHeader>
          <DialogTitle className="text-xl">Editar Produto</DialogTitle>
        </DialogHeader>

        <form action={actionSubmit} className="grid gap-4 py-4">
          <input type="hidden" name="id" value={product.id} />
          <input type="hidden" name="slug" value={slug} />
          <input
            type="hidden"
            name="existingImageUrl"
            value={product.imageUrl}
          />

          <div className="grid gap-2">
            <label className="text-sm font-semibold">Nome do Produto</label>
            <input
              required
              defaultValue={product.name}
              name="name"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold">Categoria</label>
            <select
              required
              defaultValue={product.categoryId}
              name="categoryId"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
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
                defaultValue={product.basePrice}
                name="basePrice"
                step="0.01"
                type="number"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold">
                Nova Foto (Opcional)
              </label>
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
              defaultValue={product.description}
              name="description"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={isUploading}
              className="bg-primary text-white w-full sm:w-auto"
            >
              {isUploading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
