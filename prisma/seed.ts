import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Limpando banco de dados...");
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.restaurant.deleteMany();

  console.log("Criando Espaço Camaleão...");
  const restaurant = await prisma.restaurant.create({
    data: {
      name: "Espaço Camaleão",
      slug: "espaco-camaleao",
      avatarImageUrl:
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=500&auto=format&fit=crop",
      coverImageUrl:
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop",
    },
  });

  console.log("Criando Categorias...");
  const catComerciais = await prisma.category.create({
    data: { name: "Pratos Comerciais", restaurantId: restaurant.id },
  });
  const catMilanesas = await prisma.category.create({
    data: { name: "Milanesas", restaurantId: restaurant.id },
  });
  const catParmegianas = await prisma.category.create({
    data: { name: "Parmegianas", restaurantId: restaurant.id },
  });
  const catPorcoes = await prisma.category.create({
    data: { name: "Porções", restaurantId: restaurant.id },
  });
  const catLanches = await prisma.category.create({
    data: { name: "Lanches", restaurantId: restaurant.id },
  });
  const catCervejas = await prisma.category.create({
    data: { name: "Cervejas", restaurantId: restaurant.id },
  });
  const catDrinks = await prisma.category.create({
    data: { name: "Drinks Clássicos", restaurantId: restaurant.id },
  });
  const catGin = await prisma.category.create({
    data: { name: "Gin Drinks", restaurantId: restaurant.id },
  });

  console.log("Populando Produtos...");
  await prisma.product.createMany({
    data: [
      // --- PRATOS COMERCIAIS ---
      {
        name: "Contra filé Comercial",
        slug: "comercial-contra-file",
        description: "Arroz, feijão, salada ou batata frita.",
        basePrice: 32.0,
        imageUrl:
          "https://images.unsplash.com/photo-1644951405086-5975e5fbabcc?q=80&w=500&auto=format&fit=crop",
        categoryId: catComerciais.id,
        restaurantId: restaurant.id,
      },
      {
        name: "Filé de frango Comercial",
        slug: "comercial-file-frango",
        description: "Arroz, feijão, salada ou batata frita.",
        basePrice: 26.0,
        imageUrl:
          "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=500&auto=format&fit=crop",
        categoryId: catComerciais.id,
        restaurantId: restaurant.id,
      },

      // --- MILANESAS E PARMEGIANAS ---
      {
        name: "Milanesa de Filé Mignon",
        slug: "milanesa-file-mignon",
        description: "Arroz, feijão, salada e batata frita.",
        basePrice: 40.0,
        imageUrl:
          "https://images.unsplash.com/photo-1599921841143-819065a55cc6?q=80&w=500&auto=format&fit=crop",
        categoryId: catMilanesas.id,
        restaurantId: restaurant.id,
      },
      {
        name: "Parmegiana de Contra Filé",
        slug: "parmegiana-contra-file",
        description: "Arroz, salada e batata frita.",
        basePrice: 55.0,
        imageUrl:
          "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=500&auto=format&fit=crop",
        categoryId: catParmegianas.id,
        restaurantId: restaurant.id,
      },

      // --- PORÇÕES ---
      {
        name: "Picanha 500g",
        slug: "porcao-picanha-500g",
        description: "Pão, vinagrete, farofa e maionese da casa.",
        basePrice: 100.0,
        imageUrl:
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=500&auto=format&fit=crop",
        categoryId: catPorcoes.id,
        restaurantId: restaurant.id,
      },
      {
        name: "Batata completa 500g",
        slug: "porcao-batata-completa",
        description: "Cheddar, Bacon, Maionese da casa.",
        basePrice: 50.0,
        imageUrl:
          "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=500&auto=format&fit=crop",
        categoryId: catPorcoes.id,
        restaurantId: restaurant.id,
      },
      {
        name: "Camarão empanado 500g",
        slug: "porcao-camarao-empanado",
        description: "Molho tártaro e limão.",
        basePrice: 85.0,
        imageUrl:
          "https://images.unsplash.com/photo-1559742811-822873691df8?q=80&w=500&auto=format&fit=crop",
        categoryId: catPorcoes.id,
        restaurantId: restaurant.id,
      },
      {
        name: "Dadinho de Tapioca 12Unid",
        slug: "porcao-dadinho-tapioca",
        description: "Geleia de pimenta.",
        basePrice: 45.0,
        imageUrl:
          "https://images.unsplash.com/photo-1541014741259-de529411b96a?q=80&w=500&auto=format&fit=crop",
        categoryId: catPorcoes.id,
        restaurantId: restaurant.id,
      },

      // --- LANCHES ---
      {
        name: "X-Tudo",
        slug: "lanche-x-tudo",
        description: "Frango ou carne, com tudo que tem direito.",
        basePrice: 45.0,
        imageUrl:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop",
        categoryId: catLanches.id,
        restaurantId: restaurant.id,
      },
      {
        name: "X-Salada",
        slug: "lanche-x-salada",
        description: "Frango ou carne.",
        basePrice: 29.0,
        imageUrl:
          "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=500&auto=format&fit=crop",
        categoryId: catLanches.id,
        restaurantId: restaurant.id,
      },

      // --- BEBIDAS E CERVEJAS ---
      {
        name: "Heineken 600ml",
        slug: "cerveja-heineken-600ml",
        description: "Estupidamente gelada.",
        basePrice: 18.0,
        imageUrl:
          "https://images.unsplash.com/photo-1614316905204-7c9da7b73819?q=80&w=500&auto=format&fit=crop",
        categoryId: catCervejas.id,
        restaurantId: restaurant.id,
      },
      {
        name: "Original 600ml",
        slug: "cerveja-original-600ml",
        description: "Cerveja Original 600ml.",
        basePrice: 16.0,
        imageUrl:
          "https://images.unsplash.com/photo-1575037614876-c3852d790d1c?q=80&w=500&auto=format&fit=crop",
        categoryId: catCervejas.id,
        restaurantId: restaurant.id,
      },

      // --- DRINKS ---
      {
        name: "Moscou Mule",
        slug: "drink-moscou-mule",
        description: "Vodka, xarope de gengibre, limão e água com gás.",
        basePrice: 40.0,
        imageUrl:
          "https://images.unsplash.com/photo-1513558161293-cdaf765907da?q=80&w=500&auto=format&fit=crop",
        categoryId: catDrinks.id,
        restaurantId: restaurant.id,
      },
      {
        name: "Negroni",
        slug: "drink-negroni",
        description: "Campari, Gin e Vermouth.",
        basePrice: 40.0,
        imageUrl:
          "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=500&auto=format&fit=crop",
        categoryId: catDrinks.id,
        restaurantId: restaurant.id,
      },
      {
        name: "GIN tropical",
        slug: "gin-tropical",
        description: "Gin, redbull, limão, laranja e pimenta.",
        basePrice: 40.0,
        imageUrl:
          "https://images.unsplash.com/photo-1587223075055-82e9a937ddff?q=80&w=500&auto=format&fit=crop",
        categoryId: catGin.id,
        restaurantId: restaurant.id,
      },
      {
        name: "GIN frutas vermelhas",
        slug: "gin-frutas-vermelhas",
        description: "Gin, redbull, morango, framboesa e amora.",
        basePrice: 40.0,
        imageUrl:
          "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=500&auto=format&fit=crop",
        categoryId: catGin.id,
        restaurantId: restaurant.id,
      },
    ],
  });

  console.log("✅ Seed finalizado! O Cardápio do Espaço Camaleão tá no ar!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
