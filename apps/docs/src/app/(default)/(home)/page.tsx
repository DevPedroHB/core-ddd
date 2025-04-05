import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Início",
};

export default function Home() {
	return (
		<main className="flex flex-col justify-center items-center gap-4 p-4 min-h-screen">
			<h1>Início</h1>
			<Button asChild>
				<Link href="/docs/getting-started/introduction">Documentação</Link>
			</Button>
		</main>
	);
}
