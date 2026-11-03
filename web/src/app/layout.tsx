import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Minha Estante",
  description: "Organize o que você já leu e o que quer ler.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <main className="mx-auto w-full max-w-3xl flex-1 p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
