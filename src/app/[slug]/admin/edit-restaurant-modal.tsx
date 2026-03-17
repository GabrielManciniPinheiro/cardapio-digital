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
import { Settings } from "lucide-react";
import { updateRestaurantAction } from "./actions";
import Image from "next/image";

// Definindo a interface para o Restaurante
interface RestaurantPayload {
  id: string;
  name: string;
  slug: string;
  avatarImageUrl: string | null;
}

interface EditRestaurantModalProps {
  restaurant: RestaurantPayload;
}

export function EditRestaurantModal({ restaurant }: EditRestaurantModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    await updateRestaurantAction(formData);
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 rounded-xl border-border hover:bg-muted"
        >
          <Settings className="w-4 h-4 text-muted-foreground" />
          Editar Perfil
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-100 bg-background">
        <DialogHeader>
          <DialogTitle>Editar Informações</DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-6 py-4">
          <input type="hidden" name="id" value={restaurant.id} />
          <input type="hidden" name="slug" value={restaurant.slug} />
          <input
            type="hidden"
            name="existingAvatarUrl"
            value={restaurant.avatarImageUrl || ""}
          />

          <div className="flex flex-col items-center gap-4">
            <div className="relative h-24 w-24 rounded-3xl overflow-hidden border-2 border-muted shadow-inner bg-muted">
              <Image
                src={
                  restaurant.avatarImageUrl ||
                  "https://images.unsplash.com/photo-1517248135467-4c7ed9d42339?q=80&w=200&auto=format&fit=crop"
                }
                alt="Avatar"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
                Logo do Restaurante
              </label>
              <input
                name="imageFile"
                type="file"
                accept="image/*"
                className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
              Nome do Estabelecimento
            </label>
            <input
              name="name"
              required
              defaultValue={restaurant.name}
              className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl font-bold"
          >
            {loading ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
