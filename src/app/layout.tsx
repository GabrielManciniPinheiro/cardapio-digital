import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // O 'template' permite que subpáginas mudem o título mantendo o sufixo ' | GMP SaaS'
  title: {
    default: "Cardápio Digital",
    template: "%s | GMP SaaS",
  },
  description:
    "A plataforma mais rápida e elegante para o cardápio do seu restaurante.",
  // Isso ajuda o ícone a aparecer corretamente em todos os dispositivos
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Mudamos de "en" para "pt-BR" para o navegador não oferecer tradução desnecessária
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
