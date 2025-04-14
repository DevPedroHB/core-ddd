"use client";

import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy } from "lucide-react";
import {
	Prism as SyntaxHighlighter,
	SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";

interface IDocsCode extends SyntaxHighlighterProps {}

export function DocsCode({ children, ...props }: IDocsCode) {
	const [_, copyFn] = useCopyToClipboard();

	function handleCopy() {
		copyFn(String(children))
			.then(() => {
				toast.success("Copiado para área de transferência.");
			})
			.catch((error) => {
				console.error("Failed to copy!", error);

				toast.error("Erro ao copiar para área de transferência.");
			});
	}

	return (
		<div className="relative">
			<SyntaxHighlighter
				style={dracula}
				showLineNumber
				wrapLines
				wrapLongLines
				{...props}
			>
				{String(children).trim()}
			</SyntaxHighlighter>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							type="button"
							variant="secondary"
							size="icon"
							onClick={handleCopy}
							className="top-2 right-2 absolute size-6"
						>
							<Copy className="size-3" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Copiar para área de transferência.</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
}
