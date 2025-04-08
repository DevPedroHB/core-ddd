"use client";

import { getQueryClient } from "@/libs/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";

interface IReactQueryProvider {
	children: ReactNode;
}

export function ReactQueryProvider({ children }: IReactQueryProvider) {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools buttonPosition="bottom-right" />
		</QueryClientProvider>
	);
}
