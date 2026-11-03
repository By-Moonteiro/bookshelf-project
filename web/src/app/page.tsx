import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>Minha Estante</CardTitle>
          <CardDescription>
            Organize o que você já leu e o que quer ler.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Adicionar livro</Button>
        </CardContent>
      </Card>
    </main>
  );
}
