import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Pega o cookie seguro que definimos no login
  const authCookie = request.cookies.get("admin_session")?.value;
  const pathname = request.nextUrl.pathname;

  // Se tentar acessar o admin sem estar logado, chuta pro login
  if (pathname.endsWith("/admin")) {
    if (!authCookie) {
      const slug = pathname.split("/")[1];
      const loginUrl = new URL(`/${slug}/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Se tentar acessar a tela de login já estando logado, joga pro admin
  if (pathname.endsWith("/login") && authCookie) {
    const slug = pathname.split("/")[1];
    const adminUrl = new URL(`/${slug}/admin`, request.url);
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

// Diz pro Next.js só rodar esse middleware nessas rotas para não deixar o site lento
export const config = {
  matcher: ["/:slug/admin", "/:slug/login"],
};
