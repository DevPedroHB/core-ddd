"use client";

import { keys } from "@/constants/keys";
import {
	ThemeProvider as NextThemeProvider,
	ThemeProviderProps,
} from "next-themes";

export function ThemeProvider(props: ThemeProviderProps) {
	return (
		<NextThemeProvider
			attribute="class"
			defaultTheme="system"
			storageKey={keys.THEME}
			enableSystem
			{...props}
		/>
	);
}
