import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Introdução",
};

export default function Introduction() {
	return (
		<main className="flex flex-col flex-1 gap-4 p-4 min-h-screen">
			<div className="gap-4 grid md:grid-cols-3 auto-rows-min">
				<Skeleton className="aspect-video" />
				<Skeleton className="aspect-video" />
				<Skeleton className="aspect-video" />
			</div>
			<Skeleton className="flex-1" />
		</main>
	);
}
