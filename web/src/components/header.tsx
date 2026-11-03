import Link from "next/link";

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-3xl items-center px-6">
        <Link href="/" className="text-lg font-semibold">
          Minha Estante
        </Link>
      </div>
    </header>
  );
}
