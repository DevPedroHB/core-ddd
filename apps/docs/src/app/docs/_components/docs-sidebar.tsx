import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { docsSidebarLinks } from "@/constants/docs-sidebar-links";
import { NPMPackageInfo } from "@/types/npm-package-info-types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ComponentProps, Suspense } from "react";
import { DocsSearchForm, DocsSearchFormSkeleton } from "./docs-search-form";
import {
	DocsSidebarVersionSwitcher,
	DocsSidebarVersionSwitcherSkeleton,
} from "./docs-sidebar-version-switcher";

interface IDocsSidebar extends ComponentProps<typeof Sidebar> {
	packageInfo: NPMPackageInfo;
}

export async function DocsSidebar({ packageInfo, ...props }: IDocsSidebar) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<Suspense
					fallback={
						<>
							<DocsSidebarVersionSwitcherSkeleton />
							<DocsSearchFormSkeleton />
						</>
					}
				>
					<DocsSidebarVersionSwitcher
						packageVersions={packageInfo.versions}
						time={packageInfo.time}
					/>
					<DocsSearchForm />
				</Suspense>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Documentação</SidebarGroupLabel>
					<SidebarMenu>
						{docsSidebarLinks.map((link) => (
							<Collapsible
								key={link.path}
								asChild
								defaultOpen={true}
								className="group/collapsible"
							>
								<SidebarMenuItem>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton tooltip={link.label}>
											{/* {item.icon && <item.icon />} */}
											<span>{link.label}</span>
											<ChevronRight className="ml-auto group-data-[state=open]/collapsible:rotate-90 transition-transform duration-200" />
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub>
											{link.items.map((subItem) => (
												<SidebarMenuSubItem key={subItem.path}>
													<SidebarMenuSubButton asChild>
														<Link href={`/docs/${link.path}/${subItem.path}`}>
															<span>{subItem.label}</span>
														</Link>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
								</SidebarMenuItem>
							</Collapsible>
						))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
