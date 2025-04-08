import { getPackageInfo } from "@/actions/get-package-info";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { DocsHeader } from "./_components/docs-header";
import { DocsSidebar } from "./_components/docs-sidebar";

interface IDocsLayout {
	children: ReactNode;
}

export default async function DocsLayout({ children }: Readonly<IDocsLayout>) {
	const packageInfo = await getPackageInfo();

	return (
		<SidebarProvider>
			<DocsSidebar packageInfo={packageInfo} />
			<SidebarInset>
				<DocsHeader />
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
