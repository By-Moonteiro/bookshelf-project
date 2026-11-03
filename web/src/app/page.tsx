import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Minha Estante</h1>
      <p className="text-muted-foreground">
        Organize o que você já leu e o que quer ler.
      </p>
      <Button>Adicionar livro</Button>
    </section>
  );
}
