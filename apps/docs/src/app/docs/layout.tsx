import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { DocsHeader } from "./_components/docs-header";
import { DocsSidebar } from "./_components/docs-sidebar";

interface IDocsLayout {
	children: ReactNode;
}

export default function DocsLayout({ children }: Readonly<IDocsLayout>) {
	return (
		<SidebarProvider>
			<DocsSidebar />
			<SidebarInset>
				<DocsHeader />
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
