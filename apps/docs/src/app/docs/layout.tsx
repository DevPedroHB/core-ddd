import { getPackageInfo } from "@/actions/get-package-info";
import { Footer } from "@/components/footer";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { DocsHeader } from "./_components/docs-header";
import { DocsNavigationButtons } from "./_components/docs-navigation-buttons";
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
				<main className="flex flex-col justify-between gap-4 dark:prose-invert px-4 pb-4 max-w-none min-h-[calc(100vh-7.3125rem)] prose prose-zinc">
					{children}
					<DocsNavigationButtons />
				</main>
				<Footer />
			</SidebarInset>
		</SidebarProvider>
	);
}
