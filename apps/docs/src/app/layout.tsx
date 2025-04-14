import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/functions/cn";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: {
		template: "%s | Core DDD",
		default: "Core DDD",
	},
	description:
		"Uma biblioteca TypeScript para implementação de Domain-Driven Design (DDD) em aplicações Node.js. A biblioteca fornece estruturas essenciais para construir aplicações baseadas em DDD de forma clara e consistente.",
	keywords: ["DDD", "Domain Driven Design", "Clean Architecture", "Typescript"],
	authors: [
		{
			name: "Pedro Henrique Bérgamo",
			url: "https://github.com/DevPedroHB",
		},
	],
};

interface IRootLayout {
	children: ReactNode;
}

export default function RootLayout({ children }: Readonly<IRootLayout>) {
	return (
		<html
			lang="pt-BR"
			className={cn("font-sans antialiased scroll-smooth", inter.variable)}
		>
			<body className="bg-background text-foreground">
				<ThemeProvider>
					<ReactQueryProvider>
						<NuqsAdapter>
							{children}
							<Toaster visibleToasts={9} richColors />
						</NuqsAdapter>
					</ReactQueryProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
