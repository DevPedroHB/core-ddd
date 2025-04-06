import { CompBreadcrumb } from "@/components/comp-breadcrumb";
import { Github } from "@/components/svgs/github";
import { NPM } from "@/components/svgs/npm";
import { ToggleTheme } from "@/components/toggle-theme";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SunMoon } from "lucide-react";
import Link from "next/link";
import { DocsHeaderButton } from "./docs-header-button";

export function DocsHeader() {
	return (
		<header className="flex items-center gap-2 bg-card px-4 border-b h-16 text-card-foreground shrink-0">
			<SidebarTrigger className="-ml-1" />
			<Separator orientation="vertical" className="mr-2 max-h-4" />
			<CompBreadcrumb />
			<ToggleTheme asChild>
				<DocsHeaderButton className="ml-auto">
					<SunMoon className="size-4" />
				</DocsHeaderButton>
			</ToggleTheme>
			<DocsHeaderButton asChild>
				<Link
					href="https://www.npmjs.com/package/@pedrohb/core-ddd"
					target="_blank"
				>
					<NPM className="size-4" />
				</Link>
			</DocsHeaderButton>
			<DocsHeaderButton asChild>
				<Link href="https://github.com/DevPedroHB/core-ddd" target="_blank">
					<Github className="invert dark:invert-0 size-4" />
				</Link>
			</DocsHeaderButton>
		</header>
	);
}
