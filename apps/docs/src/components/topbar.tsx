import { Sidebar, SunMoon } from "lucide-react";
import Link from "next/link";
import { DocsBreadcrumb } from "./docs-breadcrumb";
import { Github } from "./svgs/github";
import { NPM } from "./svgs/npm";
import { ToggleTheme } from "./toggle-theme";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function Topbar() {
	return (
		<header className="flex items-center gap-2 bg-card px-4 border-b h-16 text-card-foreground shrink-0">
			<Button type="button" variant="ghost" size="icon" className="size-7">
				<Sidebar className="size-4" />
			</Button>
			<Separator orientation="vertical" className="mr-2 max-h-4" />
			<DocsBreadcrumb />
			<ToggleTheme asChild>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="ml-auto size-7"
				>
					<SunMoon className="size-4" />
				</Button>
			</ToggleTheme>
			<Button
				type="button"
				variant="ghost"
				size="icon"
				className="size-7"
				asChild
			>
				<Link
					href="https://www.npmjs.com/package/@pedrohb/core-ddd"
					target="_blank"
				>
					<NPM className="size-4" />
				</Link>
			</Button>
			<Button
				type="button"
				variant="ghost"
				size="icon"
				className="size-7"
				asChild
			>
				<Link href="https://github.com/DevPedroHB/core-ddd" target="_blank">
					<Github className="invert dark:invert-0 size-4" />
				</Link>
			</Button>
		</header>
	);
}
