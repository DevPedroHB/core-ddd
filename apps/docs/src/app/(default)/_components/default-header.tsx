import { DocsHeaderButton } from "@/app/docs/_components/docs-header-button";
import { Github } from "@/components/svgs/github";
import { NPM } from "@/components/svgs/npm";
import { ToggleTheme } from "@/components/toggle-theme";
import { Separator } from "@/components/ui/separator";
import { Code2, SunMoon } from "lucide-react";
import Link from "next/link";

export function DefaultHeader() {
	return (
		<header className="flex items-center gap-2 bg-card px-4 border-b h-16 text-card-foreground shrink-0">
			<div className="flex items-center gap-2">
				<Code2 strokeWidth={2.5} className="size-6" />
				<h1 className="font-semibold">Core DDD</h1>
			</div>
			<Separator orientation="vertical" className="max-h-4" />
			<div className="flex items-center gap-2 text-muted-foreground text-sm">
				<Link
					href="/docs/getting-started/introduction"
					className="hover:text-foreground transition-all"
				>
					Documentação
				</Link>
			</div>
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
