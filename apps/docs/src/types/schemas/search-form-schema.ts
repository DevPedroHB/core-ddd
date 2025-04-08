import { z } from "@/libs/zod-i18n-map";

export const searchFormSchema = z.object({
	query: z.string().min(1),
});

export type SearchFormSchema = z.infer<typeof searchFormSchema>;
