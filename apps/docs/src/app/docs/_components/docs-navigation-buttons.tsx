"use client";

import { Button } from "@/components/ui/button";
import { docsSidebarLinks } from "@/constants/docs-sidebar-links";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IDocPage {
	label: string;
	href: string;
}

export function DocsNavigationButtons() {
	const pathname = usePathname();
	const docsPages: IDocPage[] = [];

	for (const group of docsSidebarLinks) {
		for (const item of group.items) {
			docsPages.push({
				label: item.label,
				href: `/docs/${group.path}/${item.path}`,
			});
		}
	}

	const currentIndex = docsPages.findIndex((page) => pathname === page.href);
	const prevPage = currentIndex > 0 ? docsPages[currentIndex - 1] : null;
	const nextPage =
		currentIndex < docsPages.length - 1 ? docsPages[currentIndex + 1] : null;

	return (
		<div className="flex justify-between items-center gap-4">
			{prevPage && (
				<Button type="button" variant="ghost" asChild>
					<Link href={prevPage.href}>
						<ChevronLeft className="size-4" />
						{prevPage.label}
					</Link>
				</Button>
			)}
			{nextPage && (
				<Button type="button" variant="ghost" asChild className="ml-auto">
					<Link href={nextPage.href}>
						{nextPage.label}
						<ChevronRight className="size-4" />
					</Link>
				</Button>
			)}
		</div>
	);
}
