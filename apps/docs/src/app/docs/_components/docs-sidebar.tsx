import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { ComponentProps } from "react";

interface IDocsSidebar extends ComponentProps<typeof Sidebar> {}

export function DocsSidebar(props: IDocsSidebar) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>Header</SidebarHeader>
			<SidebarContent>Content</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
