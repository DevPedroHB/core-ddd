import { cn } from "@/functions/cn";
import NextLink from "next/link";
import { ComponentProps } from "react";

interface ILink extends ComponentProps<typeof NextLink> {}

export function Link({ className, ...props }: ILink) {
	return (
		<NextLink
			data-slot="link"
			className={cn(
				"font-medium transition-all",
				"hover:text-primary",
				className,
			)}
			{...props}
		/>
	);
}
