"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers"; // Import necessário para manipular cookies

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// --- 1. ATUALIZAR RESTAURANTE (NOME E AVATAR) ---
export async function updateRestaurantAction(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const existingAvatarUrl = formData.get("existingAvatarUrl") as string;
  const imageFile = formData.get("imageFile") as File | null;

  let finalAvatarUrl = existingAvatarUrl;

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `avatar-${id}-${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("menu-images")
      .upload(fileName, imageFile);

    if (!error && data) {
      const { data: publicUrlData } = supabase.storage
        .from("menu-images")
        .getPublicUrl(fileName);

      finalAvatarUrl = publicUrlData.publicUrl;
    }
  }

  await prisma.restaurant.update({
    where: { id },
    data: {
      name,
      avatarImageUrl: finalAvatarUrl,
    },
  });

  revalidatePath(`/${slug}/admin`);
  revalidatePath(`/${slug}`); // Atualiza também o cardápio do cliente
}

// --- 2. CRIAR PRODUTO ---
export async function createProductAction(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const basePrice = Number(
    formData.get("basePrice")?.toString().replace(",", "."),
  );
  const categoryId = formData.get("categoryId") as string;
  const restaurantId = formData.get("restaurantId") as string;
  const slug = formData.get("slug") as string;
  const imageFile = formData.get("imageFile") as File | null;

  const baseSlug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-");
  const productSlug = `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`;

  let finalImageUrl =
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500&auto=format&fit=crop";

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${productSlug}-${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("menu-images")
      .upload(fileName, imageFile);

    if (!error && data) {
      const { data: publicUrlData } = supabase.storage
        .from("menu-images")
        .getPublicUrl(fileName);
      finalImageUrl = publicUrlData.publicUrl;
    }
  }

  await prisma.product.create({
    data: {
      name,
      slug: productSlug,
      description,
      basePrice,
      imageUrl: finalImageUrl,
      categoryId,
      restaurantId,
    },
  });

  revalidatePath(`/${slug}/admin`);
}

// --- 3. EXCLUIR PRODUTO ---
export async function deleteProductAction(id: string, slug: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath(`/${slug}/admin`);
}

// --- 4. ATUALIZAR PRODUTO ---
export async function updateProductAction(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const basePrice = Number(
    formData.get("basePrice")?.toString().replace(",", "."),
  );
  const categoryId = formData.get("categoryId") as string;
  const slug = formData.get("slug") as string;
  const existingImageUrl = formData.get("existingImageUrl") as string;
  const imageFile = formData.get("imageFile") as File | null;

  let finalImageUrl = existingImageUrl;

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `update-${id}-${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from("menu-images")
      .upload(fileName, imageFile);
    if (!error && data) {
      const { data: publicUrlData } = supabase.storage
        .from("menu-images")
        .getPublicUrl(fileName);
      finalImageUrl = publicUrlData.publicUrl;
    }
  }

  await prisma.product.update({
    where: { id },
    data: { name, description, basePrice, imageUrl: finalImageUrl, categoryId },
  });

  revalidatePath(`/${slug}/admin`);
}

// --- 5. LOGOUT ---
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}
