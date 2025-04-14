import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Início",
};

export default function Home() {
	return (
		<main className="flex flex-col justify-center items-center gap-4 p-4 min-h-[calc(100vh-7.3125rem)]">
			<h1 className="font-extrabold text-4xl md:text-6xl">Core DDD</h1>
			<p className="max-w-xl text-muted-foreground text-sm text-center">
				Uma biblioteca TypeScript para implementação de Domain-Driven Design
				(DDD) em aplicações Node.js. A biblioteca fornece estruturas essenciais
				para construir aplicações baseadas em DDD de forma clara e consistente.
			</p>
			<div className="flex items-center gap-2">
				<Button asChild>
					<Link href="/docs/getting-started/introduction">Documentação</Link>
				</Button>
				<Button variant="outline" asChild>
					<Link href="https://github.com/DevPedroHB/core-ddd" target="_blank">
						GitHub
					</Link>
				</Button>
			</div>
		</main>
	);
}
