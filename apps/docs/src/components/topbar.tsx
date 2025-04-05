import { Sidebar } from "lucide-react";
import { DocsBreadcrumb } from "./docs-breadcrumb";
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
		</header>
	);
}
