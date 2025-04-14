import { Button } from "@/components/ui/button";
import { cn } from "@/functions/cn";
import { ComponentProps } from "react";

interface IHeaderButton extends ComponentProps<typeof Button> {}

export function HeaderButton({ className, ...props }: IHeaderButton) {
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
