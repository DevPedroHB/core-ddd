import { Footer } from "@/components/footer";
import { ReactNode } from "react";
import { DefaultHeader } from "./_components/default-header";

interface IDefaultLayout {
	children: ReactNode;
}

export default function DefaultLayout({ children }: Readonly<IDefaultLayout>) {
	return (
		<>
			<DefaultHeader />
			{children}
			<Footer />
		</>
	);
}
