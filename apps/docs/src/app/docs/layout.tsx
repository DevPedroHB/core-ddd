import { Topbar } from "@/components/topbar";
import { ReactNode } from "react";

interface IDocsLayout {
	children: ReactNode;
}

export default function DocsLayout({ children }: Readonly<IDocsLayout>) {
	return (
		<>
			<Topbar />
			{children}
		</>
	);
}
