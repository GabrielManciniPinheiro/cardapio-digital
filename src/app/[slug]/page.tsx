import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import MenuClient from "./menu-client";

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    include: { categories: { include: { products: true } } },
  });

  if (!restaurant) return notFound();

  // "Limpamos" os dados do Prisma, transformando o Decimal em Number normal
  // para o Next.js conseguir enviar pro Cliente sem dar erro de serialização.
  const safeRestaurant = {
    ...restaurant,
    categories: restaurant.categories.map((category) => ({
      ...category,
      products: category.products.map((product) => ({
        ...product,
        basePrice: Number(product.basePrice), // Aqui matamos o erro!
      })),
    })),
  };

  return <MenuClient restaurant={safeRestaurant} />;
}
