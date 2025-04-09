"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { SidebarInput } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import {
	SearchFormSchema,
	searchFormSchema,
} from "@/types/schemas/search-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseAsString, useQueryState } from "nuqs";
import { useForm } from "react-hook-form";

export function DocsSearchForm() {
	const [query, setQuery] = useQueryState(
		"query",
		parseAsString.withDefault(""),
	);

	const form = useForm<SearchFormSchema>({
		resolver: zodResolver(searchFormSchema),
		defaultValues: {
			query,
		},
	});

	function handleSearch(data: SearchFormSchema) {
		setQuery(data.query);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSearch)}>
				<FormField
					control={form.control}
					name="query"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="sr-only">Pesquisar</FormLabel>
							<FormControl>
								<SidebarInput placeholder="Pesquisar" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}

export function DocsSearchFormSkeleton() {
	return <Skeleton className="w-full h-8" />;
}
