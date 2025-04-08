import { Footer } from "@/components/footer";
import { ReactNode } from "react";

interface IDefaultLayout {
	children: ReactNode;
}

export default function DefaultLayout({ children }: Readonly<IDefaultLayout>) {
	return (
		<>
			{children}
			<Footer />
		</>
	);
}
