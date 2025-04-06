import { Button } from "@/components/ui/button";
import { cn } from "@/functions/cn";
import { ComponentProps } from "react";

interface IDocsHeaderButton extends ComponentProps<typeof Button> {}

export function DocsHeaderButton({ className, ...props }: IDocsHeaderButton) {
	return (
		<Button
			type="button"
			variant="ghost"
			size="icon"
			className={cn("size-7", className)}
			{...props}
		/>
	);
}
