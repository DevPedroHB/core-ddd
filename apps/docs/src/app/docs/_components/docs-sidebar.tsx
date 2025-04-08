import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { NPMPackageInfo } from "@/types/npm-package-info-types";
import { ComponentProps } from "react";
import { DocsSidebarVersionSwitcher } from "./docs-sidebar-version-switcher";

interface IDocsSidebar extends ComponentProps<typeof Sidebar> {
	packageInfo: NPMPackageInfo;
}

export async function DocsSidebar({ packageInfo, ...props }: IDocsSidebar) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<DocsSidebarVersionSwitcher
					packageVersions={packageInfo.versions}
					time={packageInfo.time}
				/>
			</SidebarHeader>
			<SidebarContent>Content</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
