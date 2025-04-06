import { Monitor, Moon, Sun } from "lucide-react";

export const themes = [
	{
		value: "light",
		label: "Claro",
		icon: Sun,
	},
	{
		value: "dark",
		label: "Escuro",
		icon: Moon,
	},
	{
		value: "system",
		label: "Sistema",
		icon: Monitor,
	},
] as const;
