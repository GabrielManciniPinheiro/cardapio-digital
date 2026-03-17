"use client";

import { useRef } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Tipagens limpas e diretas, sem depender do objeto pesado do Prisma
interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  imageUrl: string;
}

interface Category {
  id: string;
  name: string;
  products: Product[];
}

interface Restaurant {
  id: string;
  name: string;
  avatarImageUrl: string | null;
  coverImageUrl: string | null;
  categories: Category[];
}

interface MenuClientProps {
  restaurant: Restaurant;
}

export default function MenuClient({ restaurant }: MenuClientProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Função que faz o Scroll estilo Netflix
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      {/* HEADER: Fonte mais fina (semibold) */}
      <header className="max-w-6xl mx-auto pt-12 pb-8 px-6 flex flex-col items-center text-center">
        {restaurant.avatarImageUrl && (
          <div className="relative h-20 w-20 rounded-2xl overflow-hidden border border-border shadow-sm mb-5">
            <Image
              src={restaurant.avatarImageUrl}
              alt={restaurant.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <h1 className="text-3xl font-semibold tracking-tight">
          {restaurant.name}
        </h1>
        <p className="text-muted-foreground font-medium mt-1">
          Navegue pelo cardápio digital do camaleão!
        </p>
      </header>

      <Tabs defaultValue={restaurant.categories[0]?.id} className="w-full">
        {/* NAVEGAÇÃO COM SETINHAS NETFLIX */}
        <div className="sticky top-0 z-50 mb-8 backdrop-blur-xl bg-background/90 py-3 border-b border-border/50">
          <div className="max-w-6xl mx-auto px-4 relative flex items-center group">
            {/* Seta Esquerda (Aparece no hover do Desktop) */}
            <button
              onClick={() => scroll("left")}
              className="hidden md:flex absolute left-2 z-10 h-8 w-8 items-center justify-center rounded-full bg-background border border-border shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>

            <TabsList
              ref={scrollRef}
              className="flex w-full justify-start overflow-x-auto no-scrollbar bg-transparent px-8 gap-2 h-auto scroll-smooth"
            >
              {restaurant.categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="rounded-xl px-6 py-2.5 text-sm font-semibold text-muted-foreground
                             bg-muted/50 border border-transparent transition-all duration-300 ease-out shrink-0
                             data-[state=active]:bg-white data-[state=active]:text-foreground 
                             data-[state=active]:shadow-sm data-[state=active]:border-border/50 cursor-pointer"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Seta Direita (Aparece no hover do Desktop) */}
            <button
              onClick={() => scroll("right")}
              className="hidden md:flex absolute right-2 z-10 h-8 w-8 items-center justify-center rounded-full bg-background border border-border shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* PRODUTOS: Largura expandida (max-w-6xl) com Grid de 2 colunas no Desktop */}
        <main className="max-w-6xl mx-auto px-4 pb-24">
          {restaurant.categories.map((category) => (
            <TabsContent
              key={category.id}
              value={category.id}
              className="outline-none animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.products.map((product) => (
                  <div
                    key={product.id}
                    className="group flex gap-4 p-4 rounded-2xl bg-card border border-border 
                               hover:border-primary/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
                               hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative h-24 w-24 shrink-0 rounded-xl overflow-hidden border border-border/50 bg-muted">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex flex-col flex-1 justify-center">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-base leading-tight text-foreground">
                          {product.name}
                        </h3>
                        <span className="font-extrabold text-primary whitespace-nowrap">
                          {Number(product.basePrice).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </main>
      </Tabs>
    </div>
  );
}
