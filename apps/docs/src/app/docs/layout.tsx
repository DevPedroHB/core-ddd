import { getPackageInfo } from "@/actions/get-package-info";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
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
				<main className="flex flex-col justify-between gap-4 dark:prose-invert px-4 pb-4 max-w-none min-h-screen prose prose-zinc">
					{children}
					<div className="flex justify-between items-center gap-4">
						<Button type="button" variant="ghost" asChild>
							<Link href="/">
								<ChevronLeft className="size-4" />
								Início
							</Link>
						</Button>
						<Button type="button" variant="ghost" asChild>
							<Link href="/docs/getting-started/installation">
								Instalação
								<ChevronRight className="size-4" />
							</Link>
						</Button>
					</div>
				</main>
				<Footer />
			</SidebarInset>
		</SidebarProvider>
	);
}
