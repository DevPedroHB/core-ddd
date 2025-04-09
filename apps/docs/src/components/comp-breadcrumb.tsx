"use client";

import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { breadcrumbLinks } from "@/constants/breadcrumb-links";
import { docsSidebarLinks } from "@/constants/docs-sidebar-links";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useMemo } from "react";
import { useMediaQuery } from "usehooks-ts";

export function CompBreadcrumb() {
	const pathname = usePathname();
	const segments = pathname.split("/").filter(Boolean);
	const isDesktop = useMediaQuery("(min-width: 48rem)");

	const linksMap = useMemo(() => {
		const map = new Map<string, string>();

		for (const link of breadcrumbLinks) {
			map.set(link.path, link.label);
		}

		for (const category of docsSidebarLinks) {
			map.set(category.path, category.label);

			for (const item of category.items) {
				map.set(item.path, item.label);
			}
		}

		return map;
	}, []);

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href="/">
							<Home className="size-4" />
						</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				{isDesktop ? (
					segments.map((segment, index) => {
						const isLastSegment = index === segments.length - 1;
						const href = `/${segments.slice(0, index + 1).join("/")}`;
						const label = linksMap.get(segment) || segment;

						return (
							<Fragment key={href}>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									{isLastSegment ? (
										<BreadcrumbPage>{label}</BreadcrumbPage>
									) : (
										<BreadcrumbLink asChild>
											<Link href={href}>{label}</Link>
										</BreadcrumbLink>
									)}
								</BreadcrumbItem>
							</Fragment>
						);
					})
				) : (
					<Fragment>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<DropdownMenu>
								<DropdownMenuTrigger className="flex items-center gap-1">
									<BreadcrumbEllipsis className="w-4 h-4" />
									<span className="sr-only">Alternar menu</span>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="start">
									{segments
										.slice(0, segments.length - 1)
										.map((segment, index) => {
											const href = `/${segments.slice(0, index + 1).join("/")}`;
											const label = linksMap.get(segment) || segment;

											return (
												<DropdownMenuItem key={href} asChild>
													<Link href="/">{label}</Link>
												</DropdownMenuItem>
											);
										})}
								</DropdownMenuContent>
							</DropdownMenu>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>
								{linksMap.get(segments[segments.length - 1])}
							</BreadcrumbPage>
						</BreadcrumbItem>
					</Fragment>
				)}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
