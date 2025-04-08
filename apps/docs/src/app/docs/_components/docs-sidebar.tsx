import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { NPMPackageInfo } from "@/types/npm-package-info-types";
import { ComponentProps, Suspense } from "react";
import { DocsSearchForm } from "./docs-search-form";
import { DocsSidebarVersionSwitcher } from "./docs-sidebar-version-switcher";

interface IDocsSidebar extends ComponentProps<typeof Sidebar> {
	packageInfo: NPMPackageInfo;
}

export async function DocsSidebar({ packageInfo, ...props }: IDocsSidebar) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<Suspense>
					<DocsSidebarVersionSwitcher
						packageVersions={packageInfo.versions}
						time={packageInfo.time}
					/>
					<DocsSearchForm />
				</Suspense>
			</SidebarHeader>
			<SidebarContent>Content</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
