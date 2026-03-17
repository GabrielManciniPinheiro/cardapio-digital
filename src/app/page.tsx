import { redirect } from "next/navigation";

export default function RootPage() {
  // O usuário bateu na home? Chuta ele direto pro cardápio do Camaleão.
  redirect("/espaco-camaleao");
}
