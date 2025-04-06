"use client";

import { themes } from "@/constants/themes";
import { useTheme } from "next-themes";
import { ComponentProps } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface IToggleTheme extends ComponentProps<typeof DropdownMenuTrigger> {}

export function ToggleTheme(props: IToggleTheme) {
	const { theme, setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger {...props} />
			<DropdownMenuContent>
				<DropdownMenuLabel>Temas</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
					{themes.map((theme) => {
						const Icon = theme.icon;

						return (
							<DropdownMenuRadioItem key={theme.value} value={theme.value}>
								{theme.label}
								<DropdownMenuShortcut>
									<Icon className="size-4" />
								</DropdownMenuShortcut>
							</DropdownMenuRadioItem>
						);
					})}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
