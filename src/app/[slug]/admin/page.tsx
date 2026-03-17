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

export default async function AdminPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 1. Busca os dados brutos do Prisma
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    include: {
      categories: true,
      products: {
        include: { category: true },
        orderBy: { categoryId: "asc" },
      },
    },
  });

  if (!restaurant) return notFound();

  // 2. Transforma o Decimal do banco de dados num Number de JavaScript
  // para podermos passar para os componentes Client (Modais) em segurança.
  const safeProducts = restaurant.products.map((product) => ({
    ...product,
    basePrice: Number(product.basePrice),
  }));

  return (
    <div className="min-h-screen bg-muted/20 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* CABEÇALHO DO DASHBOARD */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-background p-6 rounded-2xl border border-border shadow-sm">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Painel Administrativo
            </h1>
            <p className="text-muted-foreground mt-1">
              Gerenciando cardápio de:{" "}
              <span className="font-semibold text-foreground">
                {restaurant.name}
              </span>
            </p>
          </div>

          <AddProductModal
            categories={restaurant.categories}
            restaurantId={restaurant.id}
            slug={restaurant.slug}
          />
        </div>

        {/* TABELA DE PRODUTOS */}
        <div className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-20 text-center">Imagem</TableHead>
                <TableHead>Nome do Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Preço Base</TableHead>
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
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-border/50 mx-auto bg-muted">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-foreground">
                    {product.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {product.category.name}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {product.basePrice.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableCell>
                  <TableCell className="text-right pr-4">
                    <div className="flex justify-end gap-2">
                      {/* MODAL DE EDITAR E BOTÃO DE EXCLUIR */}
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
