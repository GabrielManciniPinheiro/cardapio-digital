"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const password = formData.get("password") as string;
  const slug = formData.get("slug") as string;

  // Senha master simples para o MVP. Depois podemos atrelar ao banco de dados se o cliente quiser trocar a senha.
  if (password === "camaleao2026") {
    const cookieStore = await cookies();

    // Cookie blindado, impossível de ser roubado por JavaScript malicioso no navegador
    cookieStore.set("admin_session", "logado", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // Dura 30 dias
      path: "/",
    });

    redirect(`/${slug}/admin`);
  }

  // Se a senha estiver errada, retorna para a tela exibir o erro
  redirect(`/${slug}/login?error=true`);
}
