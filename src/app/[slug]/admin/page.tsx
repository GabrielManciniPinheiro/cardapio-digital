import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddProductModal } from "./add-product-modal";
import { EditProductModal } from "./edit-product-modal";
import { DeleteProductButton } from "./delete-product-button";
import { EditRestaurantModal } from "./edit-restaurant-modal";
import { LogoutButton } from "./logout-button"; // NOVO

export default async function AdminPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    include: {
      categories: true,
      products: { include: { category: true }, orderBy: { categoryId: "asc" } },
    },
  });

  if (!restaurant) return notFound();

  // Mapeia para garantir que o basePrice é number (Prisma Decimal fix)
  const safeProducts = restaurant.products.map((product) => ({
    ...product,
    basePrice: Number(product.basePrice),
  }));

  return (
    <div className="min-h-screen bg-muted/20 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER COM LOGOUT */}
        <div className="flex justify-end mb-5">
          <LogoutButton />
        </div>

        <div className="bg-background p-6 rounded-3xl border border-border shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="relative h-20 w-20 rounded-2xl overflow-hidden border border-border bg-muted">
              <Image
                src={
                  restaurant.avatarImageUrl ||
                  "https://images.unsplash.com/photo-1517248135467-4c7ed9d42339?q=80&w=200&auto=format&fit=crop"
                }
                alt={restaurant.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {restaurant.name}
              </h1>
              <div className="flex items-center gap-3 mt-1.5">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                  Painel de Controle
                </p>
                <EditRestaurantModal
                  restaurant={{
                    id: restaurant.id,
                    name: restaurant.name,
                    slug: restaurant.slug,
                    avatarImageUrl: restaurant.avatarImageUrl,
                  }}
                />
              </div>
            </div>
          </div>

          <AddProductModal
            categories={restaurant.categories}
            restaurantId={restaurant.id}
            slug={restaurant.slug}
          />
        </div>

        <div className="bg-background rounded-3xl border border-border shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-20 text-center">Foto</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead className="text-right pr-6">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {safeProducts.map((product) => (
                <TableRow
                  key={product.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell>
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-border/50 mx-auto">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {product.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {product.category.name}
                  </TableCell>
                  <TableCell className="font-medium">
                    {product.basePrice.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableCell>
                  <TableCell className="text-right pr-4">
                    <div className="flex justify-end gap-2">
                      <EditProductModal
                        product={product}
                        categories={restaurant.categories}
                        slug={restaurant.slug}
                      />
                      <DeleteProductButton
                        id={product.id}
                        slug={restaurant.slug}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
