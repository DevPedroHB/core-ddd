"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
	NPMPackageTime,
	NPMPackageVersion,
} from "@/types/npm-package-info-types";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronsUpDown, Package } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";

interface IDocsSidebarVersionSwitcher {
	packageVersions: {
		[version: string]: NPMPackageVersion;
	};
	time: NPMPackageTime;
}

export function DocsSidebarVersionSwitcher({
	packageVersions,
	time,
}: IDocsSidebarVersionSwitcher) {
	const versions = Object.keys(packageVersions);
	const [version, setVersion] = useQueryState(
		"version",
		parseAsString.withDefault(versions[versions.length - 1]),
	);

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="bg-sidebar-primary rounded-lg size-8 aspect-square text-sidebar-primary-foreground">
								<AvatarFallback className="bg-sidebar-primary">
									<Package className="size-4" />
								</AvatarFallback>
							</Avatar>
							<div className="flex flex-col gap-0.5 leading-none">
								<strong className="font-semibold">
									{packageVersions[version].name}
								</strong>
								<span className="text-muted-foreground">v{version}</span>
							</div>
							<ChevronsUpDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="start"
						className="w-(--radix-dropdown-menu-trigger-width)"
					>
						<DropdownMenuLabel>Versões</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuRadioGroup value={version} onValueChange={setVersion}>
							{versions.map((version) => {
								return (
									<DropdownMenuRadioItem key={version} value={version}>
										{version}
										<DropdownMenuShortcut>
											{formatDistanceToNow(time[version], {
												locale: ptBR,
											})}
										</DropdownMenuShortcut>
									</DropdownMenuRadioItem>
								);
							})}
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
